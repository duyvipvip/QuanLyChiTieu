import { ICategoryTransaction } from './../../../model/category-transaction.model';
import { WalletTransactionService } from './../../../service/walletTransaction.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { WalletService } from './../../../service/wallet.service';
import { IDate } from './../../../model/date.model';
import { FomatDateService } from './../../../service/fomatDate.service';
import { Debt_LoanSevice } from './../../../service/debt-loan.service';
import { Expense } from './../../../service/expense.service';
import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { InCome } from '../../../service/income.service';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import { IWallet } from '../../../model/wallet.model';
import { CheckValueSevice } from '../../../service/check-value.sevice';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
    selector: 'app-transaction',
    styleUrls: ['./transaction.component.scss'],
    templateUrl: './transaction.component.html',
})

export class TransactionComponent implements OnInit{
    dataIncome: Array<any>;
    dataExpense: Array<any>;
    dataDebtLoan: Array<any>;

    titleTransaction: String = "Thêm Giao Dịch";
    titleCategory: String = "Chọn Danh Mục";
    nameButtonTransaction: String = "Thêm Giao Dịch";

    dateCurrent: IDate;
    stringDate: Date = new Date();
    tagUser: String = '';
    idWalletUrl: String = "";
    // DEFAUL KHI TRƯA CHỌN VÍ
    selectWallet: IWallet = {
        _id: '',
        namewallet: '',
        money: '',
    };
    
    // GIÁ TRỊ MẠC ĐỊNH KHI USER TRƯA CHỌN GIAO DỊCH
    chooseDataTransaction: ICategoryTransaction ={
        _id:'',
        name:'Chọn Danh Mục',
        image:'https://static.moneylover.me/img/icon/icon_not_selected.png',
        detect:'',
    }

    constructor(private income: InCome,
        private expense: Expense,
        private debt_loan: Debt_LoanSevice,
        private FomatDateService: FomatDateService,
        private WalletService: WalletService,
        private checkvalue:CheckValueSevice,
        private route:ActivatedRoute,
        private WalletTransactionService: WalletTransactionService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);

        // GỌI ĐẾN CÁC HÀM LẤY DATA
        this.getDataIncomes();
        this.getDataExpense();
        this.getDataDebt_Loan();
        this.getDataSelectWallet();

        

        // GÁN DATE HIỆN TẠI
        var date = new Date();
        this.dateCurrent = {
            day: this.FomatDateService.getDay(date.getDay()),
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        }
       
        // PHẦN CHỨC NĂNG TAG USER
        let thisglob = this;
        window.onload = function(e){ 
            $('#taguser').tagEditor({
                autocomplete: { delay: 0.15,
                    position: { collision: 'flip' },
                    source: ['ActionScript', 'AppleScript', 'Asp', 'BASIC', 'C', 'C++', 'CSS', 'Clojure', 'COBOL', 'ColdFusion', 'Erlang', 'Fortran', 'Groovy', 'Haskell', 'HTML', 'Java', 'JavaScript', 'Lisp', 'Perl', 'PHP', 'Python', 'Ruby', 'Scala', 'Scheme'] },
                forceLowercase: false,
                placeholder: 'Với',
                maxTags: 1,
                onChange: (field, editor, tags) =>{
                    thisglob.tagUser = tags;
                }
            });
        }

    }
    
    ngOnInit(){

    }

    // SUMMIT GỬI GIAO DỊCH 
    submitTransaction(){
        let groupCategory = this.chooseDataTransaction.detect;
        let categoryTransaction = this.chooseDataTransaction.name;
        let imagecategory   = this.chooseDataTransaction.image;
        let moneyTransaction = $('input[name=money]')[0].value;
        let noteTransaction = $('input[name=note]')[0].value;
        let idwallet = this.selectWallet._id;
        let da = new Date();
        let dateCreateTransaction = this.FomatDateService.convertDatetoUTCDate(this.stringDate);
        let tagUser = this.tagUser;

        if(groupCategory == "expense" ||  groupCategory == "loan"){
            moneyTransaction *= -1;
        }
        let submitObjectTransaction = {
            groupcategory: groupCategory,
            categorytransaction: categoryTransaction,
            imagecategory: imagecategory,
            moneytransaction: moneyTransaction,
            notetransaction: noteTransaction,
            idwallet: idwallet,
            datecreatetransaction: dateCreateTransaction,
            taguser:tagUser,
        }
        if(this.checkvalue.checkItemObjectNull(submitObjectTransaction) == true){
            this.toastr.warning('Vui lòng nhập đầy đủ các filed vào ! ', 'Warning ! ');
        }else{
            this.WalletService.addTransactionWallet(submitObjectTransaction)
                .then((data) => {
                    this.toastr.success('Thêm giao dịch thành công ! ', 'Success ! ');
                })
                .catch((err) => {
                    this.toastr.error('Thêm giao dịch thất bại ! ', 'Error ! ');
                })
        }
    }

    // ================================ FUNCTIONS =====================
    
    // LẤY DATA THU NHẬP TỪ CSDL
    getDataIncomes() {
        this.income.getDataIncomes().then((result) => {
            this.dataIncome = result.data;
        });
    }

    // LẤY DATA CHI TIÊU TỪ CSDL
    getDataExpense() {
        this.expense.getDataExpense().then((result) => {
            this.dataExpense = result.data;
        });
    }

    // LẤY DATA NỢ TỪ CSDL
    getDataDebt_Loan(){
        this.debt_loan.getDataDebt_Loans()
        .then((result) => {
            this.dataDebtLoan = result.data
        });
    }

    // CHỌN THU NHẬP, CHI TIÊU, HAY NỢ
    chooseTransaction(event){
        this.chooseDataTransaction = event;
        if(this.chooseDataTransaction.detect == 'income'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Thu Nhập';
        }else if(this.chooseDataTransaction.detect == 'expense'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Chi Tiêu';
        }else if(this.chooseDataTransaction.detect == 'debt-loan'){
            this.titleTransaction = this.nameButtonTransaction = 'Thêm Nợ/Vay';
        }


        // THÊM CLASS HIỆN THỊ MÀU CHỬ KHI CHỌN GIAO DỊCH
        $('input[name=money]').removeAttr('class');
        $('input[name=money]').addClass(this.chooseDataTransaction.detect);
        
    }

    // KHI USER CHỌN NGÀY
    changeDate(event){
        this.stringDate = event.value;
        this.dateCurrent = {
            day: this.FomatDateService.getDay(event.value.getDay()),
            date: event.value.getDate(),
            month: event.value.getMonth() + 1,
            year: event.value.getFullYear(),
        }
        
    }

    // LẤY 1 VÍ CÓ ID LÀ
    getDataSelectWallet(){
        //LẤY ID WALLET TỪ URL
        this.route.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.WalletService.getonlyWallet.subscribe((data) => {
                    this.selectWallet = data;
                });
            }else{
                this.WalletService.getAllWallet.subscribe((value) => {
                    if(!this.checkvalue.checkValueNull(value[0])){
                        this.selectWallet = value[0];
                    }
                })
            }
        })
        
    }

    // LẤY DỮ LIỆU KHI NGƯỜI DÙNG CHỌN VÍ NÀO
    eventoutputSelectIDWallet(event){
        this.selectWallet = event;
    }
}