import { TransactionService } from './../../../../service/transaction.service';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CheckValueSevice } from './../../../../service/check-value.sevice';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from './../../../../service/wallet.service';
import { ITransaction } from './../../../../model/transaction.model';
import { Component, Input} from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-update-transaction',
    styleUrls: ['./update-transaction.scss'],
    templateUrl: 'update-transaction.html',
})

export class UpdateTransactionComponent{

    public _transaction: ITransaction;
    private _objUpdateTransaction: ITransaction;
    
    nameWallet: String;
    idWalletUrl: String;
    iduser: String;

    constructor(private WalletService: WalletService,
        private route: ActivatedRoute,
        private CheckValueSevice: CheckValueSevice,
        private TransactionService: TransactionService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
        this.iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
        // LẤY ID WALLET TỪ URL
        route.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.idWalletUrl = params['params'].idwallet;
                // LẤY VÍ ĐƯỢC CHỌN HIỆN THỊ NÊN GIAO DIỆN
                this.getDataWalletId(this.idWalletUrl);   
            }
        })
    }

    @Input()
    set transaction(transaction) {
        this._transaction = {
            idcategory: transaction.idcategory,
            _id: transaction._id,
            groupcategory: transaction.groupcategory,
            notetransaction: transaction.notetransaction,
            datecreatetransaction: transaction.datecreatetransaction,
            moneytransaction: transaction.moneytransaction,
            imagecategory:transaction.imagecategory,
            categorytransaction: transaction.categorytransaction,
            idwallet: transaction.idwallet,
            taguser: transaction.taguser,
        };
        // KHI COMPONENT CHA TRUYỀN DỮ LIỆU THÌ MỚI THƯC HIỆN
        if(!this.CheckValueSevice.checkItemObjectNull(this._transaction)){
            this.getDataWalletId(transaction.idwallet);  // LẤY TÊN VÍ HIỆN THỊ LÊN
            this._transaction.idwalletold = transaction.idwallet; // DÙNG KHI CHỈNH SỬA TRANSACTION 
            // BIỂN ĐỔI MONEY THÀNH DƯƠNG
            this._transaction.moneytransaction = (Number(this._transaction.moneytransaction) < 0) ? (Number(this._transaction.moneytransaction) * -1).toString() : this._transaction.moneytransaction;
            
            // PHẦN CHỨC NĂNG TAG USER
            this.tagUse();
            
        }
    }

    // THỰC HIỆN UPDATE
    submitUpdate(){
        if(this._transaction.groupcategory == "income" || this._transaction.groupcategory == "debt"){
            if(Number(this._transaction.moneytransaction) < 0){
                this._transaction.moneytransaction = (Number(this._transaction.moneytransaction)* -1).toString();
            }
        }
        if(this._transaction.groupcategory == "expense" || this._transaction.groupcategory == "loan"){
            if(Number(this._transaction.moneytransaction) > 0){
                this._transaction.moneytransaction = (Number(this._transaction.moneytransaction)* -1).toString();
            }
        }
        this.TransactionService.updateTransaction(this._transaction)
            .then((data) => {
                this.reloadData();
                this.toastr.success('Chỉnh sửa giao dịch thành công ! ', 'Thành công ! ');
            })
            .catch((err) => {
                this.toastr.error('Chỉnh sửa giao dịch thất bại ! ', 'thất bại ! ');
            })
    }

    // HÀM LẤY DỮ LIỆU TỪ COMPONENT CON GỬI RA
    outputChooseCategory(event){
        // THAY DỔI DỮ LIỆU CATEGORY BAN ĐẦU
        this._transaction.imagecategory = event.image;
        this._transaction.groupcategory = event.detect;
        this._transaction.categorytransaction = event.name;
        this._transaction.idcategory = event._id;
    }

    // THAY ĐỔI DỮ LIỆU NGÀY GIAO DỊCH BAN ĐẦU
    changeDate(event){
        this._transaction.datecreatetransaction = event.value;
    }

    // NHẬN DỮ LIỆU TỪ COMPONENT CHOOSE-WALLET
    outputIdWallet(event){
        this._transaction.idwallet = event;
        this.getDataWalletId(event);
    }

    // LẤY 1 VÍ
    getDataWalletId(idwallet){
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((wallets) => {
            wallets.forEach(wallet => {
                if(wallet._id == idwallet){
                    this.nameWallet = wallet.namewallet;
                }
            });
        })
    }

    // XOÁ GIAO DỊCH
    submitTrashTransaction(){
        this.TransactionService.deleteTransaction(this._transaction._id)
            .then((data) => {
                this.reloadData();
                this.toastr.success('Xoá giao dịch thành công ! ', 'Thành công ! ');
            })
            .catch((err) => {
                this.toastr.error(' Xoá giao dịch thất bại ! ', 'thất bại ! ');
            })
    }

    // HIỆN THỊ TAGUSER
    tagUse(){
        $('#tag').tagEditor('destroy');
        $('#tag').tagEditor({
            initialTags: this._transaction.taguser,
            autocomplete: { delay: 0.15,
                position: { collision: 'flip' },
                source: ['ActionScript'] },
            forceLowercase: false,
            placeholder: 'Với',
            maxTags: 1,
            onChange: (field, editor, tags) =>{
                this._transaction.taguser = tags;
            }
        });
    }

    // LOAD LẠI DATA
    reloadData(){        
        let urlIdWallet = (this.route.snapshot.params.idwallet == undefined) ? '' : this.route.snapshot.params.idwallet;
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        this.TransactionService.getTransactions(urlIdWallet);
        // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
        this.WalletService.getDataWallets();    
    }
}