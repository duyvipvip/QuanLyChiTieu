import { Router } from '@angular/router';
import { WalletService } from './../../../../../service/wallet.service';
import { IWallet } from './../../../../../model/wallet.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from "@angular/core";
declare var $: any;
@Component({
    selector: "app-add-wallet",
    styleUrls: ["./add-wallet.component.scss"],
    templateUrl: "./add-wallet.component.html"
})

export class AddWalletComponent{

    dataddWallet: IWallet = {
        money: '',
        namewallet: ''
    };

    constructor(private WalletService:WalletService,
        public toastr: ToastsManager,
        private Router: Router,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
    }

    submitAddWallet(){
        if(this.dataddWallet.namewallet == ''){
            this.toastr.warning('Bạn trưa nhập tên ví ! ', 'Waring ! ');
        }else if(this.dataddWallet.money == ''){
            this.toastr.warning('Bạn trưa nhập số tiền ! ', 'Waring ! ');
        }else if(isNaN(this.dataddWallet.money)){
            this.toastr.warning('Số tiền phải là 1 số ! ', 'Waring ! ');
        }else{
            this.WalletService.addDataWallet(this.dataddWallet)
        .then((result) => {
            // LOAD LẠI DATA VÍ KHI THÊM MỚI VÍ VÀO
            this.WalletService.getDataWallets()
                .then((data) => {
                    $('#themvi').modal('hide');
                    this.resetData();
                    this.toastr.success('Thêm ví thành công ! ', 'Thành công ! ');
                })
                .catch((err) => {
                    this.toastr.error('Thêm ví thất bại ! ', 'Thất bại ! ');
                })
        });
        }
    }

    // RESET INPUT
    resetData(){
        this.dataddWallet = {
            money: '',
            namewallet: ''
        };
    }
}