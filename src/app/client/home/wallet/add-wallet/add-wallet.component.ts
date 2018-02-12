import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { WalletService } from './../../../../service/wallet.service';
import { Component, ViewContainerRef } from "@angular/core";
import { IWallet } from '../../../../model/wallet.model';

@Component({
    selector: "app-add-wallet",
    styleUrls: ["./add-wallet.component.scss"],
    templateUrl: "./add-wallet.component.html"
})

export class AddWalletComponent{

    dataddWallet: IWallet;

    constructor(private WalletService:WalletService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(){}

    submitAddWallet(namewallet, moneyWallet){
        this.dataddWallet = {
            namewallet: namewallet.value,            
            money : moneyWallet.value
        }
        this.WalletService.addDataWallet(this.dataddWallet)
        .then((result) => {
            // LOAD LẠI DATA VÍ KHI THÊM MỚI VÍ VÀO
            this.WalletService.getDataWallets()
                .then((data) => {
                    this.toastr.success('Thêm ví thành công ! ', 'Success ! ');
                })
        });
        
        
    }
}