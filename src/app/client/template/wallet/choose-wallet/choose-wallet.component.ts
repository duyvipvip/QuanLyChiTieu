import { Component, Input, Output, EventEmitter } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
    selector: "app-choose-wallet",
    templateUrl: "./choose-wallet.component.html",
    styleUrls: ["./choose-wallet.component.scss"]
})
export class ChooseWalletComponent{
    selectedWalletId: string;

    constructor(){

    }

    @Input() dataWallets: Array<any>;
    @Output() emitChooseWallet = new EventEmitter();

    removeAllCheck(select: any){
        for(let i =0; i< select.length; i++){
            select[i].classList.remove('fa-check', 'fa');
        }
    }
    chooseWallet(event){
        // XOÁ ĐI TẤT CẢ CÁC ICON CHECK       
        this.removeAllCheck(document.querySelector('#chonvi').getElementsByTagName('i'));
        // THÊM ICON CHECK VÀO ITEM CHECK
        event.target.getElementsByTagName('i')[0].classList.add('fa', 'fa-check');
        // LẤY ID ĐƯỢC CHỌN GỬI CHO COMPONENT CHA
        this.selectedWalletId = event.target.getElementsByTagName('input')[0].defaultValue;
    }

    chooseAllWallet(event){
        // XOÁ ĐI TẤT CẢ CÁC ICON CHECK   
        this.removeAllCheck(document.querySelector('#chonvi').getElementsByTagName('i'));
        // THÊM ICON CHECK VÀO ITEM CHECK
        event.target.getElementsByTagName('i')[0].classList.add('fa', 'fa-check');
        // LẤY ID ĐƯỢC CHỌN GỬI CHO COMPONENT CHA
        this.selectedWalletId = '0'
    }

    submit(){
       // console.log(event.target);
        this.emitChooseWallet.emit(this.selectedWalletId);
    }
}