import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InCome } from './../../../../service/income.service';
import { Debt_LoanSevice } from './../../../../service/debt-loan.service';
import { Expense } from './../../../../service/expense.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss']
})
export class ChooseCategoryComponent implements OnInit {

  // LẤY DỮ LIỆU CÁC GIAO DỊCH
  dataExpense: Array<any>;
  dataDebtLoan: Array<any>;
  dataIncome: Array<any>;

  @Input() inputCategory: any;
  @Output() outputCategory: EventEmitter<String> = new EventEmitter<String>();

  constructor(private expense: Expense,
    private debt_loan: Debt_LoanSevice,
    private income: InCome,
    private modalService: NgbModal,
  ) {
    // HIỆN THỊ DỮ LIỆU CHỌN CATEGORY
    this.getDataExpense();
    this.getDataDebt_Loan();
    this.getDataIncomes();
  }

  ngOnInit() {
  }
  // MỞ MODAL CHỌN CATEGORY
  openModalCategory(content) {
    this.modalService.open(content, { windowClass: 'modalCategory' });
  }

  // LẤY DATA CHI TIÊU TỪ CSDL
  getDataExpense() {
    this.expense.getDataExpense().then((result) => {
      this.dataExpense = result.data;
    });
  }

  // LẤY DATA NỢ TỪ CSDL
  getDataDebt_Loan() {
    this.debt_loan.getDataDebt_Loans()
      .then((result) => {
        this.dataDebtLoan = result.data
      });
  }
  // LẤY DATA INCOME TỪ CSDL
  getDataIncomes() {
    this.income.getDataIncomes().then((result) => {
      this.dataIncome = result.data;
    });
  }

  // LẤY CATEGORY ĐƯỢC CHỌN
  chooseCategory(event){
    let eleChoose = event.target.parentNode;
    let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
    let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
    let name = eleChoose.querySelectorAll('p')[0].textContent;
    let image = eleChoose.querySelectorAll('img')[0].src.split('/');
    image = image[image.length - 1].split('.')[0];

    let objCategory:any = {
      id: id,
      image: image,
      detect: detect,
      name: name
    }
    this.inputCategory = {
      name: name,
      image: image
    }
    this.outputCategory.emit(objCategory);
  }
}
