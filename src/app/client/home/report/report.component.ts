import { ActivatedRoute } from '@angular/router';
import { WalletTransactionService } from './../../../service/walletTransaction.service';
import { Component } from '@angular/core';
import { ITransaction } from '../../../model/transaction.model';

@Component({
    selector: 'app-report',
    templateUrl: "./report.component.html",
    styleUrls: ['report.component.scss'],
})

export class ReportComponent{
    idWalletUrl: String = "";
    arrTransactions: Array<any> = [];
    
    // GÁN DỮ LIỆU INPUT CHO COMPONET CON
    objchooseTransaction: ITransaction = {
        _id: "",
        groupcategory: '',
        notetransaction: '',
        datecreatetransaction: '',
        moneytransaction: '',
        imagecategory: '',
        categorytransaction: '',
        taguser: [],
        idwallet: '',
    };


    constructor(private WalletTransactionService: WalletTransactionService, private route: ActivatedRoute){
        // LẤY ID WALLET TỪ URL
        route.paramMap
            .subscribe((params) => {
                this.idWalletUrl = (params['params'].idwallet == undefined) ? '' : params['params'].idwallet;
                
                // LẤY DATA GÁN CHO OBJECT dataWalletChoose ĐỂ XUẤT THÔNG TIN NÊN
                this.WalletTransactionService.getTransactionToIDWallet(this.idWalletUrl);
                this.WalletTransactionService.getAllTransaction.subscribe((data) => {
                    this.arrTransactions = data;
                })
            })
    }

    // LẤY GIAO DỊCH MÀ USER CHỌN ĐỂ CHỈNH SỬA 
    chooseTransaction(transition){
        this.objchooseTransaction = transition;
    }

    

}