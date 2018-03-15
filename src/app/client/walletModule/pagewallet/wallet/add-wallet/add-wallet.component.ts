import { WalletService } from './../../../../../service/wallet.service';
import { IWallet } from './../../../../../model/wallet.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from "@angular/core";

@Component({
    selector: "app-add-wallet",
    styleUrls: ["./add-wallet.component.scss"],
    templateUrl: "./add-wallet.component.html"
})

export class AddWalletComponent{

    dataddWallet: IWallet = {
        money: '0',
        namewallet: ''
    };

    constructor(private WalletService:WalletService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(){}

    submitAddWallet(namewallet, moneyWallet){
        this.WalletService.addDataWallet(this.dataddWallet)
        .then((result) => {
            // LOAD LẠI DATA VÍ KHI THÊM MỚI VÍ VÀO
            this.WalletService.getDataWallets()
                .then((data) => {
                    this.toastr.success('Thêm ví thành công ! ', 'Thành công ! ');
                })
                .catch((err) => {
                    this.toastr.error('Thêm ví thất bại ! ', 'Thất bại ! ');
                })
        });
    }
}