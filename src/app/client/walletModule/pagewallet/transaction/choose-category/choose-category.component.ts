import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from './../../../../../service/wallet.service';
import { TransactionService } from './../../../../../service/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { InCome } from './../../../../../service/income.service';
import { Debt_LoanSevice } from './../../../../../service/debt-loan.service';
import { Expense } from './../../../../../service/expense.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "app-choose-category-add-wallet",
    templateUrl: "./choose-category.component.html",
    styleUrls: ["./choose-category.component.scss"]
})

export class ChooseCategoryAddWalletComponent{
    objDemove: any = {};
    constructor(
        private ActivatedRoute: ActivatedRoute,
        private income: InCome,
        private modalService: NgbModal,
        private WalletService: WalletService,
        private TransactionService: TransactionService,
        private expense: Expense,
        private debt_loan: Debt_LoanSevice,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,

    ){
        this.toastr.setRootViewContainerRef(vcr);
        
        this.getDataExpense();
        this.getDataDebt_Loan();
        this.getDataIncomes();
    }

    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;
    dataIncome: Array<any>;
    @Output() chooseDataCategory: EventEmitter<object> = new EventEmitter<object>();

    chooseCategory(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        let name = eleChoose.querySelectorAll('p')[0].textContent;
        let image = eleChoose.querySelectorAll('img')[0].src.split('/');
        let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
        image = image[image.length - 1].split('.')[0];
        
        // OBJECT NGƯỜI DÙNG CHỌN GIAO DICH
        let objTransaction = {
            name: name,
            _id: id,
            image: image,
            detect: detect
        }
        // GỬI OBJECT NGƯỜI DÙNG CHỌN CHO COMPONENT CHA
        this.chooseDataCategory.emit(objTransaction);
        
    }

     // ========================== FUNCTION =========================

     objectDemove(strCategory, idcategory){
        this.objDemove = {
            strCategory: strCategory,
            idcategory: idcategory,
        }
     }
    // LẤY DATA CHI TIÊU TỪ CSDL
    getDataExpense() {
        this.expense.getDataExpense().then((result) => {
            this.expense.getAllExpense().subscribe((result) => {
                this.dataExpense = result.data;
            })
        });
    }

    // LẤY DATA NỢ TỪ CSDL
    getDataDebt_Loan(){
        this.debt_loan.getDataDebt_Loans()
        .then((result) => {
            this.dataDebtLoan = result.data
        });
    }
     // LẤY DATA THU NHẬP TỪ CSDL
     getDataIncomes() {
        this.income.getDataIncomes().then(() => {
            this.income.getAllIncome().subscribe((result) => {
                this.dataIncome = result.data;
            })
        });
    }

     // MỞ MODAL XEM CÓ XOÁ KHÔNG
     openModalDelete(content){
        this.modalService.open(content, { windowClass: 'modalDelete' });
    }

    // XOÁ CATEGORY
    removeCategory(){
        if(this.objDemove.strCategory == 'income'){
           this.income.deleteIncome(this.objDemove.idcategory).then(() =>{
               this.reloadData();
                this.toastr.success('Xoá category thành công ! ', 'Success ! ');
           })
           .catch(() => {

           })
        }else if(this.objDemove.strCategory == 'expense'){
            this.expense.deleteExpense(this.objDemove.idcategory).then(() =>{
                this.reloadData();
                 this.toastr.success('Xoá category thành công ! ', 'Success ! ');
            })
            .catch(() => {
 
            })
        }
    }

    reloadData(){
        // lấy lại danh sách income
        this.income.getDataIncomes();
        // lấy lại danh sách expense
        this.expense.getDataExpense();

        let urlIdWallet = (this.ActivatedRoute.snapshot.params.idwallet == undefined) ? '' : this.ActivatedRoute.snapshot.params.idwallet;
        // LOAD LẠI CẬP NHẬT BÁO CÁO
        if(urlIdWallet != ''){
            this.TransactionService.getTransactions(urlIdWallet);
        }

         // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
         this.WalletService.getDataWallets();
      }

}