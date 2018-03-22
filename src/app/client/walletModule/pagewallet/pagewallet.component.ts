import { TransactionService } from './../../../service/transaction.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Component , ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITransaction } from '../../../model/transaction.model';

@Component({
    selector:       "app-pagewallet",
    styleUrls:      ["./pagewallet.component.scss"],
    templateUrl:    "./pagewallet.component.html"
})
export class PageWalletComponent{
    checkURL = false;
    idWalletUrl: String;

    transactions: Array<any>;

    constructor(private route: ActivatedRoute,
        public toastr: ToastsManager,
        private TransactionService: TransactionService,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
        
         // LẤY ID WALLET TỪ URL
         route.paramMap
         .subscribe((params) => {
             if(params['params'].idwallet != undefined){
                 this.checkURL = true;
             }
         })

         // LẤY ID WALLET TỪ URL
        route.paramMap
        .subscribe((params) => {
            this.idWalletUrl = (params['params'].idwallet == undefined) ? '' : params['params'].idwallet;
            
            if(this.idWalletUrl != ''){
                //LẤY DATA GÁN CHO OBJECT dataWalletChoose ĐỂ XUẤT THÔNG TIN NÊN
                this.TransactionService.getTransactions(this.idWalletUrl)
                    .then(() => {
                        this.TransactionService.getAllTransaction.subscribe((data) => {
                            this.transactions = data;
                        })
                    })
                
            }
            
        })

    }
}
