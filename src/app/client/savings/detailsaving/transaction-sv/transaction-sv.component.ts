import { SavingService } from './../../../../service/saving.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-sv',
  templateUrl: './transaction-sv.component.html',
  styleUrls: ['./transaction-sv.component.scss']
})
export class TransactionSvComponent implements OnInit {

  @Input() transaction;
  wallets;

  constructor(private savingService:SavingService) { }

  ngOnInit() {
    this.savingService.getWallet().subscribe
    (res=>{this.wallets = res
      console.log("wallett"+this.wallets);
    })
  }

  addTransaction(){
    
  }

}
