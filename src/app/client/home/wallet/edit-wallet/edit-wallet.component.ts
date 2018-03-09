import { TransactionService } from './../../../../service/transaction.service';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { IWallet } from './../../../../model/wallet.model';
import { Component, Input } from '@angular/core';
import { WalletService } from '../../../../service/wallet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    styleUrls: ['edit-wallet.component.scss'],
    templateUrl: 'edit-wallet.component.html',
    selector: 'app-edit-wallet'
})

export class EditWalletComponent{

    @Input() dataEditWallet: IWallet;
    dataUpdateWallet: IWallet;

    constructor(private WalletService: WalletService,
        private router : Router,
        public toastr: ToastsManager,
        private TransactionService: TransactionService,
        private ActivatedRoute: ActivatedRoute,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
    }

    // GỦI DỮ LIỆU CHỈNH SỬA
    submitEditWallet(name, money, id){
        this.dataUpdateWallet = {
            _id: id.value,
            money : money.value,
            namewallet: name.value
        }
        this.WalletService.updateDataWallet(this.dataUpdateWallet)
        .then((result) => {
            // CHỈNH SỬA XONG CẬP NHẬT LẠI GIAO DIỆN MỚI
            this.reloadData();
            this.toastr.success('Chỉnh sửa ví thành công ! ', 'Success ! ');        
        });
        
        
    }

   // GỦI ID XOÁ
   submitRemoveWallet(id){
        this.WalletService.deleteDataWallet(id.value)
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