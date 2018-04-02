import { LocalService } from './local.service';
import { Router, Resolve } from '@angular/router';
import { ITransaction } from './../model/transaction.model';
import { ISaving } from './../model/saving.model';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SavingService {

    // danh sách tất cả các budget
    private _allSaving:BehaviorSubject<any[]> = new BehaviorSubject(new Array());
    
    // 1 budget
    private _onlySaving:BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // TRẢ VỀ 1 MẢNG TẤT CẢ CÁC BUDGET
    get_allSaving(){
        return this._allSaving.asObservable();
    }

    // TRẢ VỀ 1 BUDGET
    get_onlySaving(){
        return this._onlySaving.asObservable();
    }
    // token
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    constructor(private http: Http, private router: Router,
        private LocalService:LocalService
        
    ) { }

    // SỬ DỤNG 1 KHOẢN TIẾT KIỆM
    useSaving(saving){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.post(this.LocalService.URL + '/api/saving/useSaving', JSON.stringify(saving), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
        .catch((err) => {
            return err;
        })
    }

    // XOÁ MỘT KHOẢN TIẾT KIỆM
    deleteSaving(idsaving){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.delete(this.LocalService.URL + '/api/saving/delete/'+idsaving, {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
        .catch((err) => {
            return err;
        })
    }

    // LẤY 1 KHOẢN TIẾT KIỆM
    getOnlySaving(idsaving) {
        return this.http
            .get(this.LocalService.URL + '/api/saving/only?idsaving=' + idsaving)
            .toPromise()
            .then((response: Response) => {
                let saving = response.json();
                
                return this.http.get(this.LocalService.URL + '/api/transaction/alltransaction/'+this._iduser)
                    .toPromise()
                    .then((transactions) => {
                        let a = new Date();
                        let b = new Date(saving.enddate);
                        saving.dateRemain = this.dateDiffInDays(a, b) + 1;

                        // TÍNH SỐ TIỀN TẤT CẢ CÁC GIAO DỊCH
                        let moneyTransaction = 0;

                        // MẢNG GIAO DỊCH CỦA KHOẢN TIẾT KIỆM
                        let tempTransaction = [];
                        transactions.json().forEach(transaction => {
                            if (transaction.idsaving == saving._id) {
                                tempTransaction.push(transaction);
                                moneyTransaction += (Number.parseInt(transaction.moneytransaction) * -1)
                            }
                        });
                        saving.arrTransaction = this.formatArrayWalletTransaction(tempTransaction);
                        saving.moneyTransaction = moneyTransaction;

                        // TÍNH SỐ TIỀN CÒN LẠI
                        saving.remainMoney = Number.parseInt(saving.moneyend) - moneyTransaction

                        // TÍNH PHẦN TRĂM HOÀN THÀNH
                        if (moneyTransaction == 0) {
                            saving.percent = 0;
                        } else {
                            saving.percent = ((moneyTransaction) * 100) / saving.moneyend;
                        }
                        
                        this._onlySaving.next(saving);
                        return saving;
                    })
            })
    }
    // CHỈNH SỬA KHOẢN TIẾT KIỆM
    editSaving(bodySaving){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.post(this.LocalService.URL + '/api/saving/update', JSON.stringify(bodySaving), { headers: headers })
            .toPromise()
            .then((response) => {
                
                return response.json();
            })
    }

    // GỬI TIỀN VÀO KHOẢN TIẾT KIỆM
    addSavingSendIn(objSendIn) {
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.post(this.LocalService.URL + '/api/saving/createSendIn', JSON.stringify(objSendIn), { headers: headers })
            .toPromise()
            .then((response) => {
                return response.json();
            })
    }

    // RÚT RA TỪ  KHOẢN TIẾT KIỆM
    addSavingSendOut(objSendOut) {
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.post(this.LocalService.URL + '/api/saving/createSendOut', JSON.stringify(objSendOut), { headers: headers })
            .toPromise()
            .then((response) => {
                return response.json();
            })
    }

    // LẤY TẤT CẢ CÁC KHOẢN TIẾT KIÊM
    getSavings() {
        return this.http
            .get(this.LocalService.URL + '/api/saving/all?iduser=' + this._iduser)
            .toPromise()
            //.catch(this.handleError)
            .then((savings: Response) => {
                return this.http.get(this.LocalService.URL + '/api/transaction/alltransaction/'+this._iduser)
                    .toPromise()
                    .then((transactions) => {
                        let data = [];
                        savings.json().forEach(saving => {
                            let a = new Date();
                            let b = new Date(saving.enddate);
                            saving.dateRemain = this.dateDiffInDays(a, b) + 1;

                            // TÍNH SỐ TIỀN TẤT CẢ CÁC GIAO DỊCH
                            let moneyTransaction = 0;
                            transactions.json().forEach(transaction => {
                                if (transaction.idsaving == saving._id) {
                                    moneyTransaction += (Number.parseInt(transaction.moneytransaction) * -1)
                                }
                            });
                            saving.moneyTransaction = moneyTransaction;

                            // TÍNH SỐ TIỀN CÒN LẠI
                            saving.remainMoney = Number.parseInt(saving.moneyend) - moneyTransaction

                            // TÍNH PHẦN TRĂM HOÀN THÀNH
                            if (moneyTransaction == 0) {
                                saving.percent = 0;
                            } else {
                                saving.percent = ((moneyTransaction) * 100) / saving.moneyend;
                            }
                            data.push(saving);
                        })
                        this._allSaving.next(data);
                        return data;
                    })
            });
    }

    // TẠO MỚI MỘT KHOẢN TIẾT KIỆM 
    addSaving(saving: ISaving) {
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.http.post(this.LocalService.URL + '/api/saving/create', JSON.stringify(saving), { headers: headers })
            .toPromise()
            .then((response) => {
                return response.json();
            })
    }

    // KHOẢNG CÁCH GIỮA 2 NGÀY
    dateDiffInDays(a, b) {
        let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
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

}


