import { IWallet } from './../../../model/wallet.model';
import { WalletService } from './../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-wallet",
    styleUrls: ['./wallet.component.scss'],
    templateUrl: 'wallet.component.html',
})

export class WalletComponent implements OnInit{
    
    idWalletUrl: string = '';
    dataWallets: IWallet[] = [];
    dataWalletChoose: IWallet = {
        _id: 0,
        namewallet: 'Tất Cả Các Ví',
        money: 0,
    };
    stringTotalMoney: number = 0;

    constructor(private WalletService: WalletService,
        private route:ActivatedRoute
    ){ 
        // LẤY ID WALLET TỪ URL
        route.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.idWalletUrl = params['params'].idwallet;
                // LẤY VÍ ĐƯỢC CHỌN HIỆN THỊ NÊN GIAO DIỆN
                this.getDataWalletId(this.idWalletUrl);   
            }
        })
    }
    
    ngOnInit(){
        if(this.idWalletUrl != ''){
            // LẤY DATA GÁN CHO OBJECT dataWalletChoose ĐỂ XUẤT THÔNG TIN NÊN
            this.getDataWalletId(this.idWalletUrl); 
        }else if(this.idWalletUrl == ''){
            // LẤY TỔNG SỐ TIỀN TRONG TẤT CẢ CÁC VÍ
            this.getTotalWallet();
        }
    }

    // =========================== FUNCTION ====================================

    // HÀM LẤY DATA WALLET TỪ MỘT ID
    getDataWalletId(idwallet){
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((data) => {
            data.forEach(element => {
                if(element._id == idwallet){
                    this.dataWalletChoose = element;
                }
            });
        })
    }

    // HÀM LẤY TỔNG TIỀN TẤT CẢ CÁC VÍ
    getTotalWallet(){
        this.WalletService.getTotalWallet()
            .then((value) => {
                this.stringTotalMoney = value;
                this.dataWalletChoose = {
                    _id: 0,
                    namewallet: 'Tất Cả Các Ví',
                    money: this.stringTotalMoney,
                };
            }) 
    }
}