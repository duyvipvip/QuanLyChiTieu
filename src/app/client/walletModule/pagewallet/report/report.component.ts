import { ITransaction } from './../../../../model/transaction.model';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { TransactionService } from '../../../../service/transaction.service';

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
        idcategory: "",
        groupcategory: '',
        notetransaction: '',
        datecreatetransaction: '',
        moneytransaction: '',
        imagecategory: '',
        categorytransaction: '',
        taguser: [],
        idwallet: '',
    };


    constructor( private route: ActivatedRoute, private TransactionService: TransactionService){
        // LẤY ID WALLET TỪ URL
        route.paramMap
            .subscribe((params) => {
                this.idWalletUrl = (params['params'].idwallet == undefined) ? '' : params['params'].idwallet;
                
                //LẤY DATA GÁN CHO OBJECT dataWalletChoose ĐỂ XUẤT THÔNG TIN NÊN
                this.TransactionService.getTransactions(this.idWalletUrl);
                this.TransactionService.getAllTransaction.subscribe((data) => {
                    this.arrTransactions = data;
                })
            })
    }

    // LẤY GIAO DỊCH MÀ USER CHỌN ĐỂ CHỈNH SỬA 
    chooseTransaction(transition){
        this.objchooseTransaction = transition;
    }

    

}