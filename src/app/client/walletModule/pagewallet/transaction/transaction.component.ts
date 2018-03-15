import { LocationComponent } from './location/location.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GooleMapsService } from './../../../../service/googlemaps.service';
import { CheckValueSevice } from './../../../../service/check-value.sevice';
import { WalletService } from './../../../../service/wallet.service';
import { FomatDateService } from './../../../../service/fomatDate.service';
import { ITransaction } from './../../../../model/transaction.model';
import { IDate } from './../../../../model/date.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewChild, ViewContainerRef, NgZone, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../../service/transaction.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

declare var $:any;
declare var google: any;

@Component({
    selector: 'app-transaction',
    styleUrls: ['./transaction.component.scss'],
    templateUrl: './transaction.component.html',
})

export class TransactionComponent{
    dataIncome: Array<any>;
    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;
    // hiện thị phần thêm chi tiết
    public adddetail = true;

    // KHỞI TẠO CÁC BIẾN VỊ TRÍ
    lat: number = 0;
    lng: number = 0;
    zoom: number = 0;

    // DANH SÁCH TẤT CẢ CÁC ĐỊA ĐIỂM
    allPlace: any[] = [];

    // OBJCET ĐỊA ĐIỂM
    objLocation = {
        lat: 0,
        lng: 0,
        name: "",
    }

    titleTransaction: String = "Thêm Giao Dịch";
    nameButtonTransaction: String = "Thêm Giao Dịch";
    dateCurrent: IDate;
    nameWallet: String = ''

    // TRANSACTION DEFAULT
    transaction : ITransaction = {
        groupcategory: '',
        idcategory: '',
        notetransaction: '',
        datecreatetransaction: new Date().toDateString(),
        moneytransaction: '',
        imagecategory: 'default',
        categorytransaction: 'Chọn Danh Mục',
        idwallet: '',
        taguser: [''],
    }
    
    
    
    constructor(private FomatDateService: FomatDateService,
        private WalletService: WalletService,
        private modalService: NgbModal,
        private checkvalue: CheckValueSevice,
        private TransactionService: TransactionService,
        private ActivatedRoute:  ActivatedRoute,
        public toastr: ToastsManager,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private GooleMapsService: GooleMapsService,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
        
        // LẤY TOẠ ĐỘ Ở VỊ TRÍ HIỆN TẠI
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
              this.zoom = 14;
            });
        }
       
        // LẤY TÊN VÍ HIỆN THỊ LÊN GIAO DIỆN
        this.paramIdWalletURL();

        // GÁN DATE HIỆN TẠI
        var date = new Date();
        this.dateCurrent = {
            day: this.FomatDateService.getDay(date.getDay()),
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        }
       
        // PHẦN CHỨC NĂNG TAG USER
        let thisglob = this;
        window.onload = function(e){ 
            $('#taguser').tagEditor({
                autocomplete: { delay: 0.15,
                    position: { collision: 'flip' },
                    source: ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'] },
                forceLowercase: false,
                placeholder: 'Với',
                maxTags: 1,
                onChange: (field, editor, tags) =>{
                    thisglob.transaction.taguser = tags;
                }
            });
            
           
        }
    }

    
    // SUMMIT GỬI GIAO DỊCH 
    submitTransaction(){
        if(this.transaction.groupcategory == "income" || this.transaction.groupcategory == "debt"){
            if(Number(this.transaction.moneytransaction) < 0){
                this.transaction.moneytransaction = (Number(this.transaction.moneytransaction)* -1).toString();
            }
        }
        if(this.transaction.groupcategory == "expense" || this.transaction.groupcategory == "loan"){
            if(Number(this.transaction.moneytransaction) > 0){
                this.transaction.moneytransaction = (Number(this.transaction.moneytransaction)* -1).toString();
            }
        }
        if(this.checkvalue.checkItemObjectNull(this.transaction) == true){
            this.toastr.warning('Vui lòng nhập đầy đủ các filed vào ! ', 'Cảnh báo ! ');
        }else{
            this.TransactionService.createTransaction(this.transaction)
                .then((data) => {
                    this.toastr.success('Thêm giao dịch thành công ! ', 'Thành công ! ');
                    this.reloadData();
                    this.resetData();
                    
                })
                .catch((err) => {
                    this.toastr.error(err, 'Thất bại ! ');
                })
        }
    }

    // ================================ FUNCTIONS =====================
    
    // LẤY DANH SÁCH TẤT CẢ CÁC ĐỊA ĐIỂM
    

    // CHỌN THU NHẬP, CHI TIÊU, HAY NỢ
    chooseCategory(event){
        this.transaction.groupcategory = event.detect;
        this.transaction.imagecategory = event.image;
        this.transaction.categorytransaction = event.name;
        this.transaction.idcategory = event._id;
        if(this.transaction.groupcategory == 'income'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Thu Nhập';
        }else if(this.transaction.groupcategory == 'expense'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Chi Tiêu';
        }else if(this.transaction.groupcategory == 'debt-loan'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Nợ/Vay';
        }
    }

    // KHI USER CHỌN NGÀY
    changeDate(event){
        
        this.transaction.datecreatetransaction = event.value.toDateString();
        this.dateCurrent = {
            day: event.value.getDay(),
            date: event.value.getDate(),
            month: event.value.getMonth() + 1,
            year: event.value.getFullYear(),
        }
        
    }

    // LẤY 1 VÍ CÓ ID LÀ
    paramIdWalletURL(){
        //LẤY ID WALLET TỪ URL
        this.ActivatedRoute.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.WalletService.getDataWalletId(params['params'].idwallet).then((data) =>{
                    this.nameWallet = data.namewallet;
                    this.transaction.idwallet = data._id;
                    
                })
                .catch((err) => {})
            }
        })
        
    }

    // LẤY DỮ LIỆU KHI NGƯỜI DÙNG CHỌN VÍ NÀO
    outputIdWallet(event){
        this.nameWallet = event.namewallet;
        this.transaction.idwallet = event._id;
    }

    // LOAD LẠI DATA
    reloadData(){
        let urlIdWallet = (this.ActivatedRoute.snapshot.params.idwallet == undefined) ? '' : this.ActivatedRoute.snapshot.params.idwallet;
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        this.TransactionService.getTransactions(urlIdWallet);
        // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
        this.WalletService.getDataWallets();      
    }

    // RESET DATA
    resetData(){
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
            taguser: [''],
        }

        // RESET TẤT CẢ CÁC TAGS
        let tags = $('#taguser').tagEditor('getTags')[0].tags;
        for (let i = 0; i < tags.length; i++) { 
            $('#taguser').tagEditor('removeTag', tags[i]); 
        }

        // RESET WALLET
        this.paramIdWalletURL();
    }


    //////////////// BẮT ĐẦU PHẦN XỬ Ý MODEL HIỂN THỊ ĐỊA ĐIỂM

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.zoom = 12;
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
    submitLocation(place){
        this.objLocation ={
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            name: place.name
        }
        console.log(this.objLocation);
    }


    //////////////// KẾT THÚC PHẦN XỬ Ý MODEL HIỂN THỊ ĐỊA ĐIỂM
}