import { IWallet } from './../../../model/wallet.model';
import { Wallet } from './../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: "app-wallet",
    styleUrls: ['./wallet.component.scss'],
    templateUrl: 'wallet.component.html',
})

export class WalletComponent implements OnInit{
    dataWallets: IWallet[] = [];
    dataWalletChoose: IWallet = {
        _id: 0,
        namewallet: 'Tất Cả Các Ví',
        money: 0,
    };
    stringTotalMoney: number = 0;

    constructor(private Wallet:Wallet){ 
    }
    
    ngOnInit(){
        // LẤY TẤT CẢ CÁC VÍ
        this.Wallet.getDataWallets()
        .then(result => {
            this.dataWallets = result.data;
        })
        .catch(error => console.log(error));

        // LẤY TỔNG SỐ TIỀN TRONG TẤT CẢ CÁC VÍ
        this.Wallet.getTotalWallet()
        .then((result) => {
            this.stringTotalMoney = result;
            // VÍ ĐƯỢC TRỌN
            this.dataWalletChoose = {
                _id: 0,
                namewallet: 'Tất Cả Các Ví',
                money: this.stringTotalMoney,
            };
        })

        
    }
    
    // COMPONENT CON TRẢ VỀ VÍ ĐƯỢC CHỌN
    // event LÀ ID DO COMPONENT CON TRẢ VỀ
    chooseWallet(event){
        if(event == 0){
            this.dataWalletChoose = {
                _id: 0,
                namewallet: 'Tất Cả Các Ví',
                money: this.stringTotalMoney,
            };
        }else{
            this.Wallet.getDataWalletId(event)
            .then(result => {
                this.dataWalletChoose = result.data;
            })
        }
    }

    submitExit() {
        console.log('duy');
    }
    
}