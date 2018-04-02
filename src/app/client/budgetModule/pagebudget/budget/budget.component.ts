import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { BudgetSevice } from './../../../../service/budget.servive';
import { IBudget } from './../../../../model/budget.model';

import { Component, ViewContainerRef } from '@angular/core';
@Component({
    selector:       "app-budget",
    styleUrls:      ["./budget.component.scss"],
    templateUrl:    "./budget.component.html"
})

export class BudgetComponent{
    budget: any;
    widthProcessBar = "style='width: 0%;'";
    budgets:IBudget[] = [{
        "idcategory": '',
        "namecategory": 'Chọn Danh Mục',
        "imagecategory": 'default',
        "idwallet": '',
        "targetmoney": '',
        "datestart": new Date().toDateString(),
        "dateend": new Date().toDateString(),
    }];

    idBudgetDelete: String;

    constructor(private BudgetSevice:BudgetSevice,
        private Router:Router,
        private modalService: NgbModal,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        ){
        this.toastr.setRootViewContainerRef(vcr);
        // LẤY TẤT CẢ CÁC NGÂN SÁCH
        this.getDataBudgets();
    }

    // CHỌN BUDGET
    chooseBudget(budget){
        this.budget = budget;
    }

    selectIdBudgetDelete(idbudget){
        this.idBudgetDelete = idbudget;
    }

    // XOÁ BUDGET
    trashBudget(){
        this.BudgetSevice.deleteBudget(this.idBudgetDelete)
            .then((data) => {
                this.reloadData();
                this.toastr.success('Xoá Ngân Sách Thành Công ! ', 'Thành công ! ');
            })
            .catch((err) => {
                this.toastr.error('Xoá Giao Dịch Thất Bại ! '+ err, 'Error ! ');
            })
    }
    // =================== function ===================
    
    // LẤY TẤT CẢ CÁC NGÂN SÁCH
    getDataBudgets(){
        this.BudgetSevice.getDataBudgets()
            .then(() => {
                // lấy dữ liệu từ subject
                this.BudgetSevice.get_allBudget().subscribe((budgets) => {
                    this.budgets = budgets;
                })
            })
            .catch((err) => {
            })
    }

    // RELOAD DATA
    reloadData(){
        // CHẠY LẠI THÔNG TIN CỦA 1 NGÂN SÁCH
        this.BudgetSevice.getDataBudgets();
    }

    // MỞ MODAL XEM CÓ XOÁ KHÔNG
    openModalDelete(content){
        this.modalService.open(content, { windowClass: 'modalDelete' });
    }
}