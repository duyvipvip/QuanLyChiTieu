import { Wallet } from './../../../../service/wallet.service';
import {Component} from "@angular/core";
import { IWallet } from '../../../../model/wallet.model';

@Component({
    selector: "app-add-wallet",
    styleUrls: ["./add-wallet.component.scss"],
    templateUrl: "./add-wallet.component.html"
})

export class AddWalletComponent{

    dataddWallet: IWallet;

    constructor(private Wallet:Wallet){}

    ngOnInit(){}

    submitAddWallet(namewallet, moneyWallet){
        this.dataddWallet = {
            namewallet: namewallet.value,            
            money : moneyWallet.value
        }
        this.Wallet.addDataWallet(this.dataddWallet)
        .then((result) => console.log(result));
    }
}