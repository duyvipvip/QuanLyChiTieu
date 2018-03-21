import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { IBudget } from '../model/budget.model';

@Injectable()
export class BudgetSevice{
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;

    // danh sách tất cả các budget
    private _allBudget:BehaviorSubject<IBudget[]> = new BehaviorSubject(new Array());
    
    // 1 budget
    private _onlyBudget:BehaviorSubject<IBudget> = new BehaviorSubject<IBudget>(null);
    
    constructor(private Http:Http){
        
    }

    // TRẢ VỀ 1 MẢNG TẤT CẢ CÁC BUDGET
    get_allBudget(){
        return this._allBudget.asObservable();
    }

    // TRẢ VỀ 1 BUDGET
    get_onlyBudget(){
        return this._onlyBudget.asObservable();
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
                        let tempTransaction = [];
                        let a = new Date();
                        let b = new Date(budget.dateend);
                        budget.dateRemain = this.dateDiffInDays(a, b)+1;
                        
                        // TÍNH SỐ NGÀY TỪ NGÀY BẮT ĐẦU ĐẾN KẾT THÚC
                        a = new Date(budget.datestart);
                        b = new Date(budget.dateend);
                        budget.dateTotal = this.dateDiffInDays(a, b)+1;

                        // TÍNH ĐỘ PX HIỆN THI HÔM NAY
                        budget.dateTotal = Number.parseInt(budget.dateTotal);
                        budget.dateRemain = Number.parseInt(budget.dateRemain);
                        budget.dateCurrent = (((budget.dateTotal-budget.dateRemain)*300)/budget.dateTotal)-35;
                        transactions.json().forEach(transaction => {
                            let timeTransaction = new Date(transaction.datecreatetransaction).getTime() + (1000*24*60*60);
                            let dateEndBudget = new Date(budget.dateend).getTime()+ (1000*24*60*60);
                            let dateStartBudget = new Date(budget.datestart).getTime();
                            
                            if(budget.idwallet == transaction.idwallet 
                                && budget.idcategory == transaction.idcategory
                                && timeTransaction >= dateStartBudget
                                && timeTransaction <= dateEndBudget
                               ){
                                tempTransaction.push(transaction);
                                totalmoney+= Number.parseInt(transaction.moneytransaction);
                            }
                        }); 
                        budget.transactions = tempTransaction;
                        budget.moneytransaction = totalmoney;
                        // tính phần trăm còn lại
                        if(totalmoney == 0){
                            budget.percent = 0;
                        }else{
                            budget.percent = ((totalmoney*-1)*100)/budget.targetmoney;
                        }

                        budget.moneyremain = Number.parseInt(budget.targetmoney) + totalmoney;
                        data.push(budget);
                    });
                    this._allBudget.next(data);
                    return data;
                    
                })
           
           
        })
        .catch(err => err);
    }

    // LẤY MỘT NGÂN SÁCH
    getDataBudget(idbudget): Promise<any>{
        return this.Http.get('http://localhost:3000/api/budget/only?idbudget='+idbudget)
        .toPromise()
        .then(budget => {
            let budgetonly = budget.json();
            return this.Http.get('http://localhost:3000/api/transaction/alltransaction')
                .toPromise()
                .then((transactions) => {
                    let totalmoney = 0
                        let tempTransaction = [];
                        let a = new Date();
                        let b = new Date(budgetonly.dateend);
                        budgetonly.dateRemain = this.dateDiffInDays(a, b)+1;

                        // TÍNH SỐ NGÀY TỪ NGÀY BẮT ĐẦU ĐẾN KẾT THÚC
                        a = new Date(budgetonly.datestart);
                        b = new Date(budgetonly.dateend);
                        budgetonly.dateTotal = this.dateDiffInDays(a, b)+1;

                        // TÍNH ĐỘ PX HIỆN THI HÔM NAY
                        budgetonly.dateTotal = Number.parseInt(budgetonly.dateTotal);
                        budgetonly.dateRemain = Number.parseInt(budgetonly.dateRemain);
                        budgetonly.dateCurrent = (((budgetonly.dateTotal-budgetonly.dateRemain)*300)/budgetonly.dateTotal)-35;
                        

                    transactions.json().forEach(transaction => {
                        let timeTransaction = new Date(transaction.datecreatetransaction).getTime() + (1000*24*60*60);
                        let dateEndBudget = new Date(budgetonly.dateend).getTime()+ (1000*24*60*60);
                        let dateStartBudget = new Date(budgetonly.datestart).getTime();
                        
                        if(budgetonly.idwallet == transaction.idwallet 
                            && budgetonly.idcategory == transaction.idcategory
                            && timeTransaction >= dateStartBudget
                            && timeTransaction <= dateEndBudget
                           ){
                            tempTransaction.push(transaction);
                            totalmoney+= Number.parseInt(transaction.moneytransaction);
                        }
                    }); 
                    budgetonly.transactions = tempTransaction;
                    budgetonly.moneytransaction = totalmoney;
                    // tính phần trăm còn lại
                    if(totalmoney == 0){
                        budgetonly.percent = 0;
                    }else{
                        budgetonly.percent = ((totalmoney*-1)*100)/budgetonly.targetmoney;
                    }
                    budgetonly.transactions = this.formatArrayWalletTransaction(budgetonly.transactions);
                    budgetonly.moneyremain = Number.parseInt(budgetonly.targetmoney) + totalmoney;
                    
                    this._onlyBudget.next(budgetonly);
                    return budgetonly;
                })
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
        const headers = new Headers({ 'Content-Type': 'application/json',"x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post('http://localhost:3000/api/budget/update', JSON.stringify(budget), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
        .catch(err => err);
    }

    // XOÁ MỘT NGÂN SÁCH
    deleteBudget(idbudget): Promise<any>{
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        const data = {
            _id: idbudget
        }
        return this.Http.post('http://localhost:3000/api/budget/delete', JSON.stringify(data), {headers:headers})
        .toPromise()
        .then((response) => {
           return response;
        })
        .catch(err => err);
    }



    // ================== function ================
    formatBudget(budgets, transactions){
        let data = [];
        budgets.json().forEach(budget => {
            let totalmoney = 0
            let tempTransaction = [];
            let a = new Date();
            let b = new Date(budget.dateend);
            budget.dateRemain = this.dateDiffInDays(a, b)+1;
            
            transactions.json().forEach(transaction => {
                let timeTransaction = new Date(transaction.datecreatetransaction).getTime() + (1000*24*60*60);
                let dateEndBudget = new Date(budget.dateend).getTime()+ (1000*24*60*60);
                let dateStartBudget = new Date(budget.datestart).getTime();
                
                if(budget.idwallet == transaction.idwallet 
                    && budget.idcategory == transaction.idcategory
                    && timeTransaction >= dateStartBudget
                    && timeTransaction <= dateEndBudget
                    ){
                    tempTransaction.push(transaction);
                    totalmoney+= Number.parseInt(transaction.moneytransaction);
                }
            }); 
            budget.transactions = tempTransaction;
            budget.moneytransaction = totalmoney;
            // tính phần trăm còn lại
            if(totalmoney == 0){
                budget.percent = 0;
            }else{
                budget.percent = ((totalmoney*-1)*100)/budget.targetmoney;
            }

            budget.moneyremain = Number.parseInt(budget.targetmoney) + totalmoney;
            data.push(budget);
            return data;
        });
    }
    formatArrayWalletTransaction(walletTransactions){
        walletTransactions.sort(function(a,b){
            a = new Date(a.datecreatetransaction);
            b = new Date(b.datecreatetransaction);
            return b - a;
        });
        // KHAI BÁO 1 MẢNG RỖNG ĐỂ CHỨA MẢNG SAU KHI GOM NHÓM CÁC GIAO DỊCH XONG
        var newArrWalletTransactions = [];
        // DUYỆT MẢNG CÁC GIAO DỊCH
        walletTransactions.forEach((walletTransaction) => {
            // DÙNG ĐỂ KIỂM TRA NẾU TÌM KIẾM HIẾT CÁC PHẦN TỬ BÊN TRONG MẢNG newArrWalletTransactions
            // MÀ KHÔNG TÌM THẤY GIAO DỊCH CÓ CÙNG NGÀY THÌ LƯU GIAO DỊCH DÓ THÀNH 1 MẢNG BÊN TRONG newArrWalletTransactions
            // NẾU TÌM THẤY THÌ TA LƯU GIAO DỊCH ĐÓ THÀNH 1 ITEM BÊN TRONG MẢNG CHỨC CÁI GIAO DỊCH CÓ CÙNG NGÀY VỚI NÓ
            let check_same = false;
            // DUYỆT CÁC MẢNG BÊN TRONG MẢNG newArrWalletTransactions
            newArrWalletTransactions.forEach((newArrWalletTransaction) => {
   
                // LẤY NGÀY CỦA GIAO DỊCH CỦA ITEM MẢNG walletTransaction
               let day_walletTransaction = new Date(walletTransaction.datecreatetransaction).getDate();
               let month_walletTransaction = new Date(walletTransaction.datecreatetransaction).getMonth();
               let year_walletTransaction = new Date(walletTransaction.datecreatetransaction).getFullYear();
                
               // LẤY NGÀY CỦA GIAO DỊCH BÊN TRONG MẢNG NẰM TRONG MẢNG newArrWalletTransactions
               let day_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getDate();
               let month_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getMonth();
               let year_newArrWalletTransaction = new Date(newArrWalletTransaction[0].datecreatetransaction).getFullYear();
                
                // SO SÁNH 2 NGÀY DÓ CÓ BÀNG NHAU KHÔNG 
                // NẾU BẰNG NHAU THÌ PUSH VÀO MẢNG newArrWalletTransaction NHƯ 1 ITEM
               if (day_walletTransaction == day_newArrWalletTransaction && month_walletTransaction == month_newArrWalletTransaction && year_walletTransaction == year_newArrWalletTransaction) {
                    newArrWalletTransaction.push(walletTransaction);
                    check_same = true;
                }
            })
             // NẾU DUYẾT HIẾT MÀ VẪN KHÔNG TÌM THẤY NGÀY TRÙNG NHAU
             // THÌ PUSH VÀO MẢNG newArrWalletTransactions NHƯ MỐT ARRAY
            if(check_same == false){
                newArrWalletTransactions.push(new Array(walletTransaction));
            }
           
        })
        return this.totalTransaction(newArrWalletTransactions);
   }
    totalTransaction(arrWalletTransactions){
        let totalAllMoneyIn = 0;
        let totalAllMoneyOut = 0;
        arrWalletTransactions.forEach((arrWalletTransaction) => {
            let totalMoney = 0;
            let dateGroupTransaction = 0;
            let monthGroupTransaction = 0;
            let yearGroupTransaction = 0;
            let dayGroupTransaction = 0;
            let moneyIn = 0;
            let moneyOut = 0;
            
            arrWalletTransaction.forEach((item) => {
                totalMoney += Number(item.moneytransaction);
                dateGroupTransaction = new Date(item.datecreatetransaction).getDate();
                dayGroupTransaction = new Date(item.datecreatetransaction).getDay();
                monthGroupTransaction = new Date(item.datecreatetransaction).getMonth();
                yearGroupTransaction = new Date(item.datecreatetransaction).getFullYear();
                (item.moneytransaction > 0) ? moneyIn += Number(item.moneytransaction) : moneyOut += Number(item.moneytransaction);
                (item.moneytransaction > 0) ? totalAllMoneyIn += Number(item.moneytransaction) : totalAllMoneyOut += Number(item.moneytransaction);
                
            })
            arrWalletTransaction.totalMoney = totalMoney;
            arrWalletTransaction.dateGroupTransaction = dateGroupTransaction;
            arrWalletTransaction.dayGroupTransaction = dayGroupTransaction;
            arrWalletTransaction.monthGroupTransaction = monthGroupTransaction;
            arrWalletTransaction.yearGroupTransaction = yearGroupTransaction;
            arrWalletTransaction.moneyIn = moneyIn;
            arrWalletTransaction.moneyOut = moneyOut;
        })
        arrWalletTransactions.totalAllMoneyIn = totalAllMoneyIn;
        arrWalletTransactions.totalAllMoneyOut = totalAllMoneyOut;
        arrWalletTransactions.remain = totalAllMoneyIn + totalAllMoneyOut;
       return arrWalletTransactions;
    }
    
    // KHOẢNG CÁCH GIỮA 2 NGÀY
    dateDiffInDays(a, b) {
        let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }
}

