import { ISaving } from './../../../model/saving.model';
import { SavingService } from './../../../service/saving.service';
import { WalletService } from './../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';
import { IWallet } from '../../../model/wallet.model';


@Component({
  selector: 'app-addsaving',
  templateUrl: './addsaving.component.html',
  styleUrls: ['./addsaving.component.scss']
})
export class AddsavingComponent{
    dataWallets: IWallet[];
    objSaving: ISaving = {
      namesaving: '',
      walletid: '',
      moneyend: 0,
      enddate: new Date,
      userid: ''
    };
    
    constructor(private WalletService: WalletService,
    private SavingService: SavingService){
      // HÀM LẤY DATA TẤT CÁ CẢ VÍ
      this.getDataWallets();
      
    }

    addDataSaving(){
      this.SavingService.addSaving(this.objSaving);
        
      console.log(this.objSaving);
    }

    //================================= FUNCTION ================================
    // HÀM LẤY DATA TẤT CÁ CẢ VÍ

    getDataWallets() {
      this.WalletService.getDataWallets();
      this.WalletService.getAllWallet.subscribe((wallet) => {
          this.dataWallets = wallet;
      })
      
  }
}