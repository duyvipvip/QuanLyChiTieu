import { WalletService } from './../../../../service/wallet.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IWallet } from '../../../../model/wallet.model';

@Component({
    selector: "app-choose-wallet-transaction",
    templateUrl: "./choose-wallet-transaction.html",
    styleUrls: ["./choose-wallet-transaction.scss"],
})

export class ChooseWalletTransactionComponent{

    dataWallets: IWallet[] = [];
    

    @Input() inputSelectWallet: IWallet;
    @Output() outputSelectIDWallet: EventEmitter<object> = new EventEmitter<object>();
    
    constructor(private WalletService: WalletService){
        this.getDataWallets();
    }

    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((data) => {
            this.dataWallets = data;            
        })
    }

    chooseWallet(idWallet){
        if(idWallet == this.inputSelectWallet._id){
            return "fa fa-check";
        }
        return '';
    }

    chooseNameWallet(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let name = eleChoose.querySelectorAll('.name-vallet')[0].textContent;
        let money = eleChoose.querySelectorAll('input[name=money]')[0].value;
        this.inputSelectWallet = {
            _id: id,
            namewallet: name,
            money: money 
        }
        this.outputSelectIDWallet.emit(this.inputSelectWallet);
    }
}