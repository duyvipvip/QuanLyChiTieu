import { LocationComponent } from './location/location.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GooleMapsService } from './../../../../service/googlemaps.service';
import { CheckValueSevice } from './../../../../service/check-value.sevice';
import { WalletService } from './../../../../service/wallet.service';
import { FomatDateService } from './../../../../service/fomatDate.service';
import { ITransaction } from './../../../../model/transaction.model';
import { IDate } from './../../../../model/date.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../../service/transaction.service';
import { } from '@types/googlemaps';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
declare var $: any;
declare var google: any;

@Component({
    selector: 'app-transaction',
    styleUrls: ['./transaction.component.scss'],
    templateUrl: './transaction.component.html',
})

export class TransactionComponent {
    dataIncome: Array<any>;
    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;
    // hiện thị phần thêm chi tiết
    public adddetail = true;

    // KHỞI TẠO CÁC BIẾN VỊ TRÍ
    lat: number = 10.812035;
    lng: number = 106.7119887
    zoom: number = 14;

    // DANH SÁCH TẤT CẢ CÁC ĐỊA ĐIỂM
    allPlace: any[] = [];

    // OBJCET ĐỊA ĐIỂM
    objLocation = {
        lat: 10.812035,
        lng: 106.7119887,
        name: "Đặt vị trí",
    }

    dataWallets: Array<any>;
    infoCheckMoney: any = {};
    public modalCheckMoney: NgbModalRef;

    titleTransaction: String = "Thêm Giao Dịch";
    nameButtonTransaction: String = "Thêm Giao Dịch";
    dateCurrent = new Date();
    nameWallet: String = '';


    // TRANSACTION DEFAULT
    transaction: ITransaction = {
        groupcategory: '',
        idcategory: '',
        datecreatetransaction: new Date().toDateString(),
        moneytransaction: '',
        imagecategory: 'default',
        categorytransaction: 'Chọn Danh Mục',
        idwallet: '',
    }

    // URL HÌNH ẢNH
    public url: String = '';
    private fileToUpload: File = null;

    ngOnInit() {
        // LẤY TẤT CẢ CÁC VÍ HIỂN THỊ LÊN
        this.getDataWallets();

        // LẤY TOẠ ĐỘ Ở VỊ TRÍ HIỆN TẠI
        this.setCurrentPosition();

    }

    constructor(private FomatDateService: FomatDateService,
        private WalletService: WalletService,
        private modalService: NgbModal,
        private checkvalue: CheckValueSevice,
        private TransactionService: TransactionService,
        private ActivatedRoute: ActivatedRoute,
        private GooleMapsService: GooleMapsService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
    ) {
        this.toastr.setRootViewContainerRef(vcr);

        // LẤY TÊN VÍ HIỆN THỊ LÊN GIAO DIỆN
        this.paramIdWalletURL();

        // PHẦN CHỨC NĂNG TAG USER
        let thisglob = this;
        
        window.onload = function () {
            $('#taguser').tagEditor({
                autocomplete: {
                    delay: 0.15,
                    position: { collision: 'flip' },
                    source: ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme']
                },
                forceLowercase: false,
                placeholder: 'Với',
                onChange: (field, editor, tags) => {
                    thisglob.transaction.taguser = tags;
                }
            });
        }
    }

    // LẤY FILE
    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.fileToUpload = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
        }
    }

    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((wallet) => {
            this.dataWallets = wallet;
        })
    }

    changeMoneyWallet() {

        let obj = {
            _id: this.transaction.idwallet,
            money: this.infoCheckMoney.moneytrnasction,
            namewallet: this.infoCheckMoney.namewallet
        }
        this.WalletService.updateDataWallet(obj)
            .then((result) => {
                this.modalCheckMoney.close();
                // CHỈNH SỬA XONG CẬP NHẬT LẠI GIAO DIỆN MỚI
                this.reloadData();
                this.toastr.success('Điều chỉnh số tiền trong ví thành công ! ', 'Success ! ');
            });
    }

    changeMoneyTransaction() {
        this.transaction.moneytransaction = this.infoCheckMoney.moneywallet;
        this.modalCheckMoney.close();
    }

    // SUMMIT GỬI GIAO DỊCH 
    submitTransaction(modalCheckMoney) {
        if (this.transaction.groupcategory == '') {
            this.toastr.warning('Vui lòng chọn category ! ', 'Cảnh báo ! ');
        } else if (this.transaction.moneytransaction == '') {
            this.toastr.warning('Vui lòng nhập số tiền vào ! ', 'Cảnh báo ! ');
        } else if (isNaN(Number.parseInt(this.transaction.moneytransaction.toString()))) {
            this.toastr.warning('Số tiền phải là 1 số ! ', 'Waring ! ');
        } else {
            let checkMoney = true;
            if (this.transaction.groupcategory == "expense") {
                this.dataWallets.forEach((wallet) => {
                    if (wallet._id == this.transaction.idwallet) {
                        if ((Number.parseInt(this.transaction.moneytransaction.toString())) > wallet.money) {
                            this.infoCheckMoney['moneywallet'] = wallet.money;
                            this.infoCheckMoney['moneytrnasction'] = this.transaction.moneytransaction;
                            checkMoney = false;
                        }
                    }
                })
            }
            if (checkMoney == true) {
                // thay đổi dấu
                if (this.transaction.groupcategory == "income" || this.transaction.groupcategory == "debt") {
                    if (Number(this.transaction.moneytransaction) < 0) {
                        this.transaction.moneytransaction = (Number(this.transaction.moneytransaction) * -1).toString();
                    }
                }
                if (this.transaction.groupcategory == "expense" || this.transaction.groupcategory == "loan") {
                    if (Number(this.transaction.moneytransaction) > 0) {
                        this.transaction.moneytransaction = (Number(this.transaction.moneytransaction) * -1).toString();
                    }
                }

                // tạo một giao dịch
                this.TransactionService.createTransaction(this.transaction)
                    .then((result) => {
                        // upload hình ảnh
                        if (this.fileToUpload != null) {
                            this.TransactionService.uploadImage(result._id, this.fileToUpload)
                                .then((data) => {
                                    this.toastr.success('Thêm giao dịch thành công ! ', 'Thành công ! ');
                                    this.reloadData();
                                    this.resetData();
                                })
                        } else {
                            this.toastr.success('Thêm giao dịch thành công ! ', 'Thành công ! ');
                            this.reloadData();
                            this.resetData();
                        }
                    })
                    .catch((err) => {
                        this.toastr.error(err, 'Thất bại ! ');
                    })
            } else {
                this.modalCheckMoney = this.modalService.open(modalCheckMoney, { windowClass: 'modalCheckMoney' });
            }
        }
    }
    // CHỌN THU NHẬP, CHI TIÊU, HAY NỢ
    chooseCategory(event) {
        this.transaction.groupcategory = event.detect;
        this.transaction.imagecategory = event.image;
        this.transaction.categorytransaction = event.name;
        this.transaction.idcategory = event._id;
        if (this.transaction.groupcategory == 'income') {
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Thu Nhập';
        } else if (this.transaction.groupcategory == 'expense') {
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Chi Tiêu';
        } else if (this.transaction.groupcategory == 'debt-loan') {
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Nợ/Vay';
        }
    }

    // XOÁ HÌNH ẢNH
    deleteImage() {
        this.url = null;
        this.fileToUpload = null;
    }

    // KHI USER CHỌN NGÀY
    changeDate(event) {
        this.dateCurrent = new Date(event.value.toDateString());
        this.transaction.datecreatetransaction = new Date(event.value.toDateString()).toString();
    }

    // LẤY 1 VÍ CÓ ID LÀ
    paramIdWalletURL() {
        //LẤY ID WALLET TỪ URL
        this.ActivatedRoute.paramMap
            .subscribe((params) => {
                if (params['params'].idwallet != undefined) {
                    this.WalletService.getDataWalletId(params['params'].idwallet).then((data) => {
                        this.nameWallet = data.namewallet;
                        this.infoCheckMoney['namewallet'] = data.namewallet;
                        this.transaction.idwallet = data._id;

                    })
                        .catch((err) => { })
                }
            })

    }

    // LẤY DỮ LIỆU KHI NGƯỜI DÙNG CHỌN VÍ NÀO
    outputIdWallet(event) {
        this.nameWallet = event.namewallet;
        this.infoCheckMoney['namewallet'] = event.namewallet;
        this.transaction.idwallet = event._id;
    }

    // LOAD LẠI DATA
    reloadData() {
        let urlIdWallet = (this.ActivatedRoute.snapshot.params.idwallet == undefined) ? '' : this.ActivatedRoute.snapshot.params.idwallet;
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        this.TransactionService.getTransactions(urlIdWallet);
        // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
        this.WalletService.getDataWallets();
    }

    // RESET DATA
    resetData() {
        this.titleTransaction = "Thêm Giao Dịch";
        this.nameButtonTransaction = "Thêm Giao Dịch";
        this.transaction = {
            idcategory: '',
            groupcategory: '',
            notetransaction: '',
            datecreatetransaction: new Date().toDateString(),
            moneytransaction: '',
            imagecategory: 'default',
            categorytransaction: 'Chọn Danh Mục',
            idwallet: '',
        }

        // RESET TẤT CẢ CÁC TAGS
        if(this.transaction.taguser != null){
            let tags = $('#taguser').tagEditor('getTags')[0].tags;
            for (let i = 0; i < tags.length; i++) {
                $('#taguser').tagEditor('removeTag', tags[i]);
            }
        }
        this.url = null;
        this.fileToUpload = null;

        delete this.transaction.location;
        this.objLocation.name = "Đặt vị trí";
        

        // RESET WALLET
        this.paramIdWalletURL();

        // RESET IMAGE
        this.url = null;
        this.fileToUpload = null;
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 14;
            });
        }
    }

    // MỞ MODAL CHỌN ĐỊA ĐIỂM GOOGLE MAP
    open(content) {
        this.GooleMapsService.getPlaceNear(this.lat, this.lng).then((data) => {
            this.allPlace = data.results;
        })
        this.modalService.open(content);

    }

    // SUBMIT ĐỊA ĐIỂM
    submitLocation(place) {
        this.objLocation = {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            name: place.name
        }
        this.transaction.location = this.objLocation;
    }

    // XOÁ ĐI VỊ CHÍ ĐÃ CHỌN
    deleteLocation() {
        delete this.transaction.location;
        this.objLocation.name = "Đặt vị trí";
    }

}