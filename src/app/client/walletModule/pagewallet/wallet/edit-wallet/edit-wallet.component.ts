import { WalletService } from './../../../../../service/wallet.service';
import { IWallet } from './../../../../../model/wallet.model';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../../../service/transaction.service';

@Component({
    styleUrls: ['edit-wallet.component.scss'],
    templateUrl: 'edit-wallet.component.html',
    selector: 'app-edit-wallet'
})

export class EditWalletComponent{

    dataUpdateWallet: IWallet = {
        _id: '',
        money: '',
        namewallet: ''
    };
    @Input()
    set dataEditWallet(wallet) {
       if(wallet._id != ''){
           this.dataUpdateWallet._id = wallet._id;
           this.dataUpdateWallet.money = wallet.money;
           this.dataUpdateWallet.namewallet = wallet.namewallet;
       }
    }
    constructor(private WalletService: WalletService,
        private router : Router,
        public toastr: ToastsManager,
        private TransactionService: TransactionService,
        private ActivatedRoute: ActivatedRoute,
        vcr: ViewContainerRef
    ){
        // this.dataEditWallet ={
        //     _id: this.dataEditWallet._id,
        //     money : this.dataEditWallet.money,
        //     namewallet: this.dataEditWallet.namewallet
        // };
        this.toastr.setRootViewContainerRef(vcr);
    }

    // GỦI DỮ LIỆU CHỈNH SỬA
    submitEditWallet(){
        this.WalletService.updateDataWallet(this.dataUpdateWallet)
        .then((result) => {
            // CHỈNH SỬA XONG CẬP NHẬT LẠI GIAO DIỆN MỚI
            this.reloadData();
            this.toastr.success('Chỉnh sửa ví thành công ! ', 'Success ! ');        
        });
        
        
    }

   // GỦI ID XOÁ
   submitRemoveWallet(){
        this.WalletService.deleteDataWallet(this.dataUpdateWallet._id)
        .then((result) =>{
            this.WalletService.getDataWallets()
                .then((data) =>{
                    this.toastr.success('Xoá ví thành công ! ', 'Success ! ');
                    this.router.navigate(['/wallet']);
                })
        })
        .catch((err) => {
            this.toastr.error('Xoá ví thất bại ! ', 'Error ! ');
        })       
   }

   // LOAD LẠI DATA
    reloadData(){
        let urlIdWallet = (this.ActivatedRoute.snapshot.params.idwallet == undefined) ? '' : this.ActivatedRoute.snapshot.params.idwallet;
        
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        this.TransactionService.getTransactions(urlIdWallet);
        // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
        this.WalletService.getDataWallets();      
    }
}