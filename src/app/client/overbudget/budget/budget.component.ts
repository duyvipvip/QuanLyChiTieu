import { BudgetSevice } from './../../../service/budget.servive';
import { IBudget } from './../../../model/budget.model';

import { Component } from '@angular/core';
@Component({
    selector:       "app-budget",
    styleUrls:      ["./budget.component.scss"],
    templateUrl:    "./budget.component.html"
})

export class BudgetComponent{
    test = "width: 50%;";
    budgets:IBudget[] = [{
        "idcategory": '',
        "namecategory": 'Chọn Danh Mục',
        "imagecategory": 'default',
        "idwallet": '',
        "targetmoney": '',
        "datestart": new Date(),
        "dateend": new Date(),
    }]
    constructor(private BudgetSevice:BudgetSevice){
        // LẤY TẤT CẢ CÁC NGÂN SÁCH
        this.getDataBudgets();
    }

    // =================== function ===================
    
    // LẤY TẤT CẢ CÁC NGÂN SÁCH
    getDataBudgets(){
        this.BudgetSevice.getDataBudgets()
            .then((data) => {
                this.budgets = data;
            })
            .catch((err) => {
            })
    }
}