import { IWallet } from './../../../../../../model/wallet.model';
import { WalletService } from './../../../../../../service/wallet.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "app-choose-wallet-edit-transaction-budget",
    templateUrl: "./choose-wallet.html",
    styleUrls: ["./choose-wallet.scss"],
})

export class ChooseWalletUpdateTransactionBudgetComponent{

    dataWallets: IWallet[] = [];
    

    @Input() inputSelectWallet;
    @Output() outputSelectIDWallet: EventEmitter<object> = new EventEmitter<object>();
    
    constructor(private WalletService: WalletService){
        this.getDataWallets();
    }

    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets().then(() => {
            this.WalletService.getAllWallet.subscribe((data) => {
                this.dataWallets = data;            
            })
        });
       
    }

    // HIỆN THỊ DẤU TÍCH
    iconTick(idWallet){
        return (idWallet == this.inputSelectWallet) ? 'fa fa-check' : '';
    }

    chooseWallet(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let name = eleChoose.querySelectorAll('.name-vallet')[0].textContent;

        let inputSelectWallet = {
            _id: id,
            namewallet: name,
        }
        this.outputSelectIDWallet.emit(inputSelectWallet);
    }
}