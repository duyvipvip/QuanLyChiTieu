import { WalletService } from './../../../../../service/wallet.service';
import { IWallet } from './../../../../../model/wallet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit , Output, EventEmitter } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
    selector: "app-choose-wallet-home",
    templateUrl: "./choose-wallet.component.html",
    styleUrls: ["./choose-wallet.component.scss"]
})
export class ChooseWalletHomeComponent implements OnInit{
    idWalletUrl: string = '';
    dataWallets: IWallet[];
    totalMoney: Number = 0;
    

    constructor(private route:ActivatedRoute, private router: Router, private WalletService: WalletService){
        // LẤY ID WALLET TỪ URL
        route.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.idWalletUrl = params['params'].idwallet;                
            }
        })
    }

    ngOnInit(){
        // LẤY TẤT CẢ CÁC VÍ HIỂN THỊ LÊN
        this.getDataWallets();
    }

    iconTick(idWallet){
        return (idWallet == this.idWalletUrl) ? 'fa fa-check' : '';
    }
    //================================= FUNCTION ================================
    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets();
        let arrId = [];
        this.WalletService.getAllWallet.subscribe((wallet) => {
            this.dataWallets = wallet;
            // TÌNH TỔNG TIỀN
            this.totalMoney=0;
            wallet.forEach((item) => {
                this.totalMoney += item.money;
            })
        })
        
    }
}