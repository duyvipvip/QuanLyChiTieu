import { WalletService } from './../../../../service/wallet.service';
import { IWallet } from './../../../../model/wallet.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from '../../../template/menu/menu.component';

@Component({
    selector: "app-wallet",
    styleUrls: ['./wallet.component.scss'],
    templateUrl: 'wallet.component.html',
})

export class WalletComponent implements OnInit{
    iduser: String = "";
    idWalletUrl: string = '';
    dataWallets: IWallet[] = [];
    dataWalletChoose: IWallet = {
        _id: 0,
        namewallet: 'Tổng cộng',
        money: 0,
    };
    stringTotalMoney: number = 0;

    constructor(private WalletService: WalletService,
        private route:ActivatedRoute
    ){ 
        MenuComponent.updateUserStatus.next();
        this.iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
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
    }

    // =========================== FUNCTION ====================================

    // HÀM LẤY DATA WALLET TỪ MỘT ID
    getDataWalletId(idwallet){
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((wallets) => {
            wallets.forEach(wallet => {
                if(wallet._id == idwallet){
                    this.dataWalletChoose = wallet;
                }
            });
        })
    }

    // HÀM LẤY TỔNG TIỀN TẤT CẢ CÁC VÍ
    getTotalWallet(){
        let iduser = "0";
        this.WalletService.getDataWallets();
        let arrId = [];
        this.WalletService.getAllWallet.subscribe((wallet) => {
            this.dataWallets = wallet;

            // TÌNH TỔNG TIỀN
            wallet.forEach((item) => {
                if(arrId.length == 0){
                    arrId.push(item._id);
                    this.dataWalletChoose.money = item.money;
                }
                for(let i =0; i< arrId.length; i++){
                    if(arrId[i] != item._id){
                        this.dataWalletChoose.money += item.money;
                    }
                }
                
            })
        })
    }
}