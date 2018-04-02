import { TransactionService } from './../../../service/transaction.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Component , ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITransaction } from '../../../model/transaction.model';
declare var $: any;

@Component({
    selector:       "app-pagewallet",
    styleUrls:      ["./pagewallet.component.scss"],
    templateUrl:    "./pagewallet.component.html"
})
export class PageWalletComponent{
    checkURL = false;
    idWalletUrl: String;

    transactions: Array<any>;
    tab0 = {
        name: 'Tháng Trước',
        value: new Date().getTime() - ((1000 * 60 * 60 * 24) * 31),
    };
    tab1 = {
        name: 'Tháng này',
        value: new Date().getTime(),
    };
    tab2 = {
        name: 'Tương Lai',
        value: new Date().getTime() + ((1000 * 60 * 60 * 24) * 31),
    }

    // Ngày muốn lọc dữ liệu
    timeDateString = new Date().getTime();

    // TRUYỀN CHO COMPONENT CON ĐỂ RELOAD ĐÚNG TAB 
    timeDateInput = new Date().getTime();

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
                this.TransactionService.getTransactions(this.idWalletUrl, this.timeDateString)
                    .then(() => {
                        this.TransactionService.getAllTransaction.subscribe((data) => {
                            this.transactions = data;
                        })
                    })
                
            }
            
        })

    }

    chooseDate(tabstring, objtab){
        let monthBeforeString = new Date( new Date().getTime()).getMonth() + "/" + new Date().getFullYear();
        let monthString = new Date(new Date().getTime() + ((1000 * 60 * 60 * 24) * 30)).getMonth() + "/" + new Date().getFullYear();
        let monthAfterString = new Date(new Date().getTime() + ((1000 * 60 * 60 * 24) * 60)).getMonth() + "/" + new Date().getFullYear();
        $("#line-report").attr('style','left: 33.3333%');

        if(tabstring=="tab0"){
            this.tab0 = {
                name: new Date(this.tab0.value - ((1000 * 60 * 60 * 24) * 30)).getMonth()+1 + "/" + new Date(this.tab0.value - ((1000 * 60 * 60 * 24) * 30)).getFullYear(),
                value: this.tab0.value - ((1000 * 60 * 60 * 24) * 30),
            };
            this.tab2 = this.tab1;
            this.tab1 = objtab;
        }
        if(this.tab2.name != "Tương Lai"){
            
            if(tabstring=='tab2'){
                this.tab0 = this.tab1;
                this.tab1 = objtab;
                this.tab2 = {
                    name: new Date(this.tab2.value + ((1000 * 60 * 60 * 24) * 30)).getMonth()+1 + "/" + new Date(this.tab2.value + ((1000 * 60 * 60 * 24) * 30)).getFullYear(),
                    value: this.tab2.value + ((1000 * 60 * 60 * 24) * 30)
                };
            }
            console.log(this.tab1.name,this.tab2.name);
            if(this.tab2.name == monthBeforeString){
                this.tab2.name = "Tháng Trước"
            }else if(this.tab2.name == monthString){
                this.tab2.name = "Tháng Này"
            }else if(this.tab2.name == monthAfterString){
                this.tab2.name = "Tương Lai"
            }
        }else{
            $("#line-report").attr('style','left: 66.6666%');

            $("#tab2").attr('style','color: rgba(255, 255, 255)');
            $("#tab1").attr('style','color: rgba(255, 255, 255, 0.7)');
        }

        if(tabstring == "tab1"){
            
            $("#tab1").attr('style','color: rgba(255, 255, 255)');
            $("#tab2").attr('style','color: rgba(255, 255, 255, 0.7)');

            $("#line-report").attr('style','left: 33.3333%');
        }
        this.timeDateString = objtab.value;
        this.timeDateInput = objtab.value;
        this.TransactionService.getTransactions(this.idWalletUrl, this.timeDateString);
    }
}
