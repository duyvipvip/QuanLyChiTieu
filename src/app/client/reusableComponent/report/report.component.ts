import { SavingService } from './../../../service/saving.service';
import { GooleMapsService } from './../../../service/googlemaps.service';
import { InCome } from './../../../service/income.service';
import { Debt_LoanSevice } from './../../../service/debt-loan.service';
import { Expense } from './../../../service/expense.service';
import { BudgetSevice } from './../../../service/budget.servive';
import { WalletService } from './../../../service/wallet.service';
import { ITransaction } from './../../../model/transaction.model';
import { transition } from '@angular/core/src/animation/dsl';
import { ViewContainerRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { ToastsManager } from 'ng2-toastr';
import { TransactionService } from '../../../service/transaction.service';
@Component({
    selector: 'app-report',
    templateUrl: "./report.component.html",
    styleUrls: ['report.component.scss'],
})

export class ReportComponent{

    /**
     * setCurrentPosition() lấy toạ độ vị trí hiện tại
     * deleteTransaction() xoá đi một giao dịch
     * deleteLocation() xoá đi vị chí đã chọn
     * updateTransactionReport() chỉnh sửa giao dịch
     * submitLocation() lấy địa điểm được chọn
     * openModalGoogleMaps() mở modal địa điểm google map
     * openModalUpdateTransaction() mở modal để chỉnh sửa giao dịch
     * openModalCategory() mở modal chọn category
     * openModalWallet() mở modal chọn ví
     * iconTick() lấy dấu tick hiển thị lên ds ví
     * chooseWallet() lấy thông tin ví được chọn
     * getNameWallet() lấy tên ví hiện thị lên
     * chooseCategory() lấy thông tin category được chọn
     * getDataExpense() lấy dữ liệu các chi tiết
     * getDataDebt_Loan() lấy dữ liệu nợ
     * getDataIncomes() lấy dữ liệu thu nhập
     * reloadData() reload lại data
     * getDataWallets() lấy tất cả ví hiện thị lên
     */

    arrTransactions: ITransaction[];
    // mảng các giao dịch
    @Input()
    set inputTransactions(transaction) {
        this.arrTransactions = transaction;
    }

    // một giao dich
    _transaction: any;

    // GIAO DỊCH CHỈNH SỬA
    _editTransaction: any;

    // tên ví
    nameWallet: String;
    
    // DANH SÁCH TẤT CẢ CÁC ĐỊA ĐIỂM
    allPlace: any[] = [];

    // TOẠ DỘ MẶC ĐỊNH KHI GỮI CHO COMPONNET CON
    objLocation ={
        lat: 0,
        lng: 0,
        name: "Đặt vị trí",
        xoa: false
    }

    // GÁN DỮ LIỆU INPUT CHO COMPONET CON
    objchooseTransaction: ITransaction = {
        _id: "",
        idcategory: "",
        groupcategory: '',
        notetransaction: '',
        datecreatetransaction: '',
        moneytransaction: '',
        imagecategory: '',
        categorytransaction: '',
        taguser: [],
        idwallet: '',
    };

    // ĐƯỜNG DẪN HÌNH ẢNH
    urlImage: String = "";

    // CHỨA HÌNH ẢNH
    fileToUpload: File = null;

    // id wallet của giao dịch
    idWallet: String;

    // OBJECT TRUYỀN CHO COMPONENT CON
    objCategory ={
        name: '',
        image: ''
    };

    constructor( private route: ActivatedRoute,
         private TransactionService: TransactionService,
         private modalService: NgbModal,
         private WalletService: WalletService,
         private BudgetSevice: BudgetSevice,
         private SavingService: SavingService,
         public toastr: ToastsManager,
         vcr: ViewContainerRef,
         private GooleMapsService: GooleMapsService,
        
    ){
        this.toastr.setRootViewContainerRef(vcr);

       
    }
    
    // LẤY TOẠ ĐỘ COMPONENT CHA CON GỬI
    selectLocation(event){
        event.xoa == false ? this._editTransaction.location = event: delete this._editTransaction.location;
    }

    // LẤY FILE
    onSelectFile(event) { 
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.fileToUpload = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]); 
            reader.onload = (event: any) => { 
                this.urlImage = event.target.result;
            }
        }
    }

    // XOÁ HÌNH ẢNH
    deleteImage(){
        this.urlImage = null;
        this.fileToUpload = null;
        delete this._editTransaction.image;
    }

    // XOÁ MỘT GIAO DICH
    deleteTransaction(){
        this.TransactionService.deleteTransaction(this._transaction._id)
            .then((data) => {
                this.reloadData();
                this.toastr.success('Xoá giao dịch thành công ! ', 'Thành công ! ');
            })
            .catch((err) => {
                this.toastr.error(' Xoá giao dịch thất bại ! ', 'thất bại ! ');
            })
    }

    // CHỈNH SỬA GIAO DỊCH
    updateTransactionReport(){
        this._editTransaction.moneytransaction = this._editTransaction.moneytransaction.toString().replace(/,/g, '')
        
         // chỉnh sửa lại money
         if(this._editTransaction.groupcategory == "income" || this._editTransaction.groupcategory == "debt"){
            if(Number(this._editTransaction.moneytransaction) < 0){
                this._editTransaction.moneytransaction = (Number(this._editTransaction.moneytransaction)* -1).toString();
            }
        }
        if(this._editTransaction.groupcategory == "expense" || this._editTransaction.groupcategory == "loan"){
            if(Number(this._editTransaction.moneytransaction) > 0){
                this._editTransaction.moneytransaction = (Number(this._editTransaction.moneytransaction)* -1).toString();
            }
        }
        this.TransactionService.updateTransaction(this._editTransaction)
            .then((result) => {
                if(this.fileToUpload != null){
                    this.TransactionService.uploadImage(result._id, this.fileToUpload)
                    .then((data) => {
                        this.toastr.success('Chỉnh sửa giao dịch thành công ! ', 'Thành công ! ');
                        this.reloadData();
                    })
                }else{
                    this.toastr.success('Chỉnh sửa giao dịch thành công ! ', 'Thành công ! ');
                    this.reloadData();
                }
            })
            .catch((err) => {
                this.toastr.error('Chỉnh sửa giao dịch thất bại ! '+err, 'thất bại ! ');
            })
    }
    // khi user chỉnh sửa ngày
    changeDate(event){
        this._editTransaction.datecreatetransaction = event.value
    }

    // MỞ MODAL CHỌN UPDATE GIAO DICH
    openModalUpdateTransaction(content, transaction) {
        // lấy giao dịch dược chọn
        this._transaction = transaction;

        // lấy ví của giao dịch
        this.idWallet = transaction.idwallet;

        // lấy tên ví hiển thị nên
        this.getNameWallet(transaction.idwallet);
        
        // lấy giao dịch được chọn để chỉnh sửa
        this._editTransaction = {
            "categorytransaction": transaction.categorytransaction,
            "imagecategory": transaction.imagecategory,
            "moneytransaction": transaction.moneytransaction,
            "datecreatetransaction": transaction.datecreatetransaction,
            "idcategory": transaction.idcategory,
            "idwallet": transaction.idwallet,
            "groupcategory": transaction.groupcategory,
            "idwalletold": transaction.idwallet,
            "_id": transaction._id,
        };
        if(transaction.location != undefined){
            this._editTransaction.location = transaction.location;
            this.objLocation.name = transaction.location.name;
        }
        if(transaction.taguser != undefined) this._editTransaction.taguser = transaction.taguser;
        if(transaction.notetransaction != undefined) this._editTransaction.notetransaction = transaction.notetransaction;
        if(transaction.image != undefined) {
            this._editTransaction.image = transaction.image;
            this.urlImage = "http://localhost:3000/images/"+transaction.image;
        }
        if(transaction.idsaving != undefined){
            this._editTransaction.idsaving = transaction.idsaving;
        }

        // gán dữ liệu cho objCategory
        this.objCategory = {
            name: transaction.categorytransaction,
            image: transaction.imagecategory,
        }
        
        // mở modal
        this.modalService.open(content, { windowClass: 'modalUpdateTransaction' });
        
    }

    // LẤY ID WALLET TỪ COMPONNENT CHA HIỂN THỊ RA
    chooseWallet(event){
        this._editTransaction.idwalletold = event;
    }

    // LẤY TÊN VÍ
    getNameWallet(idwallet) {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((wallets) => {
            wallets.forEach(wallet => {
                if (wallet._id == idwallet) {
                this.nameWallet = wallet.namewallet;
                }
            });
        })
    }

    // LẤY DỮ LIỆU TỪ COMPONET CON
    chooseCategory(event){
        this._editTransaction.imagecategory = event.image;
        this._editTransaction.categorytransaction = event.name;
        this._editTransaction.idcategory = event.id;
        this._editTransaction.groupcategory = event.detect;
    }
    


    // LOAD LẠI DATA
    reloadData(){        
        let urlIdWallet = (this.route.snapshot.params.idwallet == undefined) ? '' : this.route.snapshot.params.idwallet;
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        this.TransactionService.getTransactions(urlIdWallet);
         // CHẠY LẠI THÔNG TIN CỦA 1 NGÂN SÁCH
        let urlIdBudget = (this.route.snapshot.params.idbudget == undefined) ? '' : this.route.snapshot.params.idbudget;
        if(urlIdBudget != '')  this.BudgetSevice.getDataBudget(urlIdBudget);
        
        // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
        this.WalletService.getDataWallets();   
        
        // CẬP NHẬT LẠI DỮ LIỆU TIẾT KIỆM
        let urlIdSaving = (this.route.snapshot.params.idsaving == undefined) ? '' : this.route.snapshot.params.idsaving;
        if(urlIdSaving != ''){
            this.SavingService.getOnlySaving(urlIdSaving);
            // CẬP NHẬT LẠI MẢNG SAVING
            this.SavingService.getSavings();
        }
        
    }
    
}