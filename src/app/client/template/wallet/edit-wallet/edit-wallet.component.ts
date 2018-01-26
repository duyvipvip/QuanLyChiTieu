import { IWallet } from './../../../../model/wallet.model';
import { Component, Input } from '@angular/core';
import { Wallet } from '../../../../service/wallet.service';

@Component({
    styleUrls: ['edit-wallet.component.scss'],
    templateUrl: 'edit-wallet.component.html',
    selector: 'app-edit-wallet'
})

export class EditWalletComponent{

    @Input() dataEditWallet: IWallet;
    dataUpdateWallet: IWallet;

    constructor(private Wallet:Wallet){}

    // GỦI DỮ LIỆU CHỈNH SỬA
    submitEditWallet(name, money, id){
        this.dataUpdateWallet = {
            _id: id.value,
            money : money.value,
            namewallet: name.value
        }
        this.Wallet.updateDataWallet(this.dataUpdateWallet)
        .then((result) => console.log(result));
    }
   // GỦI ID XOÁ
   submitRemoveWallet(id){
        this.Wallet.deleteDataWallet(id.value)
        .then((result) => console.log(result));
   }
}