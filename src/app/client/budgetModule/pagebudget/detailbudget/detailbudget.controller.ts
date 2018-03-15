import { ITransaction } from './../../../../model/transaction.model';
import { WalletService } from './../../../../service/wallet.service';
import { BudgetSevice } from './../../../../service/budget.servive';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
@Component({
    selector:       "app-detailbudget",
    styleUrls:      ["./detailbudget.controller.scss"],
    templateUrl:    "./detailbudget.controller.html"
})

export class DetailBudgetComponent{
    idBudgetUrl = "";
    nameWallet = "";
    // CÁC THÔNG TIN CỦA 1 TRANSACTION
    objchooseTransaction : ITransaction = {
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
    budget: any;
    
    constructor( private ActivatedRoute:ActivatedRoute, 
        private BudgetSevice:BudgetSevice,
        private WalletService:WalletService,
    ){
        
        ActivatedRoute.paramMap
        .subscribe((params) => {
            if(params['params'].idbudget != undefined){
                this.idBudgetUrl = params['params'].idbudget;
                this.getBudget(this.idBudgetUrl);
            }
        })
       
    }

    // LẤY GIAO DỊCH MÀ USER CHỌN ĐỂ CHỈNH SỬA 
    chooseTransaction(transition){
        this.objchooseTransaction = transition;
        
    }

    // ================ function =================

    // LẤY 1 BUDGET
    getBudget(idbudget){
        this.BudgetSevice.getDataBudget(idbudget)
            .then((data) => {
                // LẤY TÊN VÍ
                this.WalletService.getDataWalletId(data.idwallet)
                    .then(() => {
                        // LẤY TÊN VÍ TỪ SUBJECT
                        this.WalletService.get_onlyWallet().subscribe((wallet) => {
                            this.nameWallet = wallet.namewallet.toString() || null;
                        })
                    });
               
                // LẤY DỮ LIỆU 1 BUDGET
                this.BudgetSevice.get_onlyBudget().subscribe((budget) => {
                    this.budget = budget;
                })
            })
    }
}