import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { IBudget } from '../model/budget.model';

@Injectable()
export class BudgetSevice{
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    
    constructor(private Http:Http){
        
    }

    // LẤY TẤT CẢ CÁC NGÂN SÁCH
    getDataBudgets(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/budget/all?iduser='+ this._iduser)
        .toPromise()
        .then(budgets => {
            return this.Http.get('http://localhost:3000/api/transaction/alltransaction')
                .toPromise()
                .then((transactions) => {
                    let data = [];
                    budgets.json().forEach(budget => {
                        let totalmoney = 0
                        transactions.json().forEach(transaction => {
                            let timeTransaction = new Date(transaction.datecreatetransaction).getTime() + 24*60*60;
                            let dateEndBudget = new Date(budget.dateend).getTime();
                            let dateStartBudget = new Date(budget.datestart).getTime();
                            console.log(budget.datestart,budget.dateend );
                            console.log(transaction.datecreatetransaction);
                            if(budget.idwallet == transaction.idwallet 
                                && budget.idcategory == transaction.idcategory
                                && timeTransaction >= dateStartBudget 
                                && timeTransaction <= dateEndBudget){
                                    
                                totalmoney+= Number.parseInt(transaction.moneytransaction);
                            }
                        });
                        budget.moneytransaction = totalmoney;
                        data.push(budget);
                    });
                    console.log(data);
                    return budgets.json();
                    
                })
            // budgets.json().forEach(budget => {
            //     let datestart = new Date(budget.datestart).getTime();
            //     let dateend = new Date(budget.dateend).getTime()
            //     return this.Http.get('http://localhost:3000/api/wallettransaction/getonly?idWallet='+ budget.idwallet)
            //             .toPromise()
            //             .then((wallet) => {
            //                 let data = wallet.json()[0].transactions;
            //                 data.forEach(transaction => {
            //                     let dateTransaction = new Date(transaction.datecreatetransaction).getTime();
            //                     if(dateTransaction >= datestart && dateTransaction <= dateend){
            //                         console.log(transaction);
            //                     }
            //                     console.log('ok');
            //                 })
                            
            //             })
            // });
           
        })
        .catch(err => err);
    }

    // LẤY MỘT NGÂN SÁCH
    getDataBudget(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/getbudget')
        .toPromise()
        .then(budget => {
           
            return budget.json();
        })
        .catch(err => err);
    }

    // THÊM MỘT NGÂN SÁCH
    createBudget(budget: IBudget): Promise<any>{
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token  });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post('http://localhost:3000/api/budget/create', JSON.stringify(budget), {headers:headers})
        .toPromise()
        .then((response) => {
           return response;
        })
        .catch(err => err);
    }

    // CHỈNH SỬA MỘT NGÂN SÁCH
    updateBudget(budget: IBudget): Promise<any>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post('http://localhost:3000/api/updatebudget', JSON.stringify(budget), {headers:headers})
        .toPromise()
        .then((response) => {
           return response;
        })
        .catch(err => err);
    }

    // XOÁ MỘT NGÂN SÁCH
    deleteBudget(budget: IBudget): Promise<any>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post('http://localhost:3000/api/deletebudget', JSON.stringify(budget), {headers:headers})
        .toPromise()
        .then((response) => {
           return response;
        })
        .catch(err => err);
    }
}