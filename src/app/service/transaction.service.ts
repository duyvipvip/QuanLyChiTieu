import { LocalService } from './local.service';
import { ITransaction } from './../model/transaction.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http , RequestOptions, RequestMethod, Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService{
    private _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    constructor(private Http:Http,
        private LocalService:LocalService,
    ){
    }
    private _allTransaction:BehaviorSubject<ITransaction[]> = new BehaviorSubject(new Array());
    
    get getAllTransaction(){
        return this._allTransaction.asObservable();
    }

    // XOÁ TẤT CẢ CÁC GIAO DỊCH CÙNG TIME
    deleteTransactionToTime(time){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.delete(this.LocalService.URL + '/api/transaction/deleteTransactionToTime/'+time, {headers:headers})
        .toPromise()
        .then((response) => {
            return response;
        })
        .catch(err => err);
    }

    // TẠO MỚI MỘT GIAO DỊCH 
    createTransaction(transition: ITransaction){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/transaction/create', JSON.stringify(transition), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
    }
    // CẬP NHẬT MỘT GIAO DỊCH
    updateTransaction(transition: ITransaction){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/transaction/update', JSON.stringify(transition), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
        .catch((err) => {
            return err;
        })
    }
    

    // XOÁ MỘT GIAO DỊCH
    deleteTransaction(idtransaction){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
       return this.Http.post(this.LocalService.URL + '/api/transaction/delete', {"idtransaction": idtransaction}, {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

    // LẤY TẤT CẢ CÁC GIAO DỊCH CỦA 1 VÍ 
    getTransactions(idwallet, time = null, changeFomat = true, report = {}){
        let monthCurrrent = new Date().getMonth()+1;
        let yearCurrrent = new Date().getFullYear();
        let dayCurrrent = new Date().getDate();
        
        return this.Http.get(this.LocalService.URL + '/api/transaction/all?idwallet='+ idwallet)
            .toPromise()
            .then((data) => {
                if(changeFomat == true){
                    let tempData =[];
                    if(time != null){
                        let monthTime = new Date(time).getMonth()+1;
                        let yearTime = new Date(time).getFullYear();
                        // PHẦN TÍNH CHO THÁNG HIỆN TẠI
                        if(yearTime == yearCurrrent && monthCurrrent == monthTime){
                            data.json().forEach(transaction => {
                                let dateTransaction = new Date(transaction.datecreatetransaction).getDate();
                                let monthTransaction = new Date(transaction.datecreatetransaction).getMonth()+1;
                                let yearTransaction = new Date(transaction.datecreatetransaction).getFullYear();
                                if(dateTransaction <= dayCurrrent && monthTransaction == monthTime && yearCurrrent == yearCurrrent){
                                    tempData.push(transaction);
                                }
                            });
                        }
                        // PHẦN TÍNH CHO THÁNG TƯƠNG LẠI
                        if(yearTime >= yearCurrrent && monthTime > monthCurrrent){
                            data.json().forEach(transaction => {
                                let dateTransaction = new Date(transaction.datecreatetransaction).getDate();
                                let monthTransaction = new Date(transaction.datecreatetransaction).getMonth()+1;
                                let yearTransaction = new Date(transaction.datecreatetransaction).getFullYear();
                                if(dateTransaction > dayCurrrent && monthTransaction >= monthCurrrent && yearCurrrent >= yearCurrrent){
                                    tempData.push(transaction);
                                }
                            });
                        }
                        // PHẦN TÍNH CHO THÁNG ĐÃ QUA
                        if(yearTime <= yearCurrrent && monthTime < monthCurrrent){
                            data.json().forEach(transaction => {
                                let dateTransaction = new Date(transaction.datecreatetransaction).getDate();
                                let monthTransaction = new Date(transaction.datecreatetransaction).getMonth()+1;
                                let yearTransaction = new Date(transaction.datecreatetransaction).getFullYear();
                                if(monthTransaction == monthTime && yearTransaction == yearTime){
                                    tempData.push(transaction);
                                }
                            });
                        }
                        let resultThenFormat = this.formatArrayWalletTransaction(tempData);
                        this._allTransaction.next(resultThenFormat);
                        return resultThenFormat;
                    }else{
                       
                        let resultThenFormat = this.formatArrayWalletTransaction(data.json());
                        this._allTransaction.next(resultThenFormat);
                        return resultThenFormat;
                    }
                }else if(changeFomat == false){
                    let dayFrom = new Date(report['start']).getDate();
                    let monthFrom = new Date(report['start']).getMonth()+1;
                    let yearFrom = new Date(report['start']).getFullYear();

                    let dayTo = new Date(report['end']).getDate();
                    let monthTo = new Date(report['end']).getMonth()+1;
                    let yearTo = new Date(report['end']).getFullYear();
                    let dataTemp = [];


                    data.json().forEach(transaction => {
                        let dayTransaction = new Date(transaction.datecreatetransaction).getDate();
                        let monthTransaction = new Date(transaction.datecreatetransaction).getMonth()+1;
                        let yearTransaction = new Date(transaction.datecreatetransaction).getFullYear();

                        if(dayTransaction <= dayTo && dayTransaction >= dayFrom){
                            if(yearTransaction <= yearTo && yearTransaction >= yearFrom){
                                
                                if(monthTransaction <= monthTo && monthTransaction >= monthFrom){
                                    dataTemp.push(transaction);
                                } 
                            }
                            
                        }
                    });

                    return dataTemp;
                }
                

            })
            .catch((err) => {
                return err;
            })
    }

    // GỬI HÌNH ANH
    uploadImage(idtransaction, file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        const headers = new Headers({'x-access-token': this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
          
        return this.Http.post(this.LocalService.URL + '/api/transaction/image?idtransaction='+ idtransaction, formData, {headers:headers})
            .toPromise()
            .then((data) => {
                return data.json();
            })
            .catch((err) => {
                return err;
            })
    }

    // LẤY TẤT CẢ CÁC GIAO DỊCH
    getAllTransactions(){
        return this.Http.get(this.LocalService.URL + '/api/transaction/alltransaction/'+ this._iduser)
            .toPromise()
            .then((data) => {
                return data.json();
            })
            .catch((err) => {
                return err;
            })
    }


    /*================================function ======================*/

    // LẤY TẤT CẢ CÁC TRANSACTION TỪ TẤT CẢ CÁC VÍ
    groupTransaction(arrTransactionAllWallet){
        let newArrTransactionAllWallet = [];
        arrTransactionAllWallet.forEach((arrTransactionWallet) => {
            arrTransactionWallet.transactions.forEach((transactions) => {
                newArrTransactionAllWallet.push(transactions);
            });
        })
        newArrTransactionAllWallet.sort(function(a,b){
            a = new Date(a.datecreatetransaction);
            b = new Date(b.datecreatetransaction);
            return b - a;
        });
        return this.formatArrayWalletTransaction(newArrTransactionAllWallet);
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
            let moneyIn = 0;
            let moneyOut = 0;
            
            arrWalletTransaction.forEach((item) => {
                totalMoney += Number(item.moneytransaction);
                dateGroupTransaction = item.datecreatetransaction;
                (item.moneytransaction > 0) ? moneyIn += Number(item.moneytransaction) : moneyOut += Number(item.moneytransaction);
                (item.moneytransaction > 0) ? totalAllMoneyIn += Number(item.moneytransaction) : totalAllMoneyOut += Number(item.moneytransaction);
                
            })
            arrWalletTransaction.totalMoney = totalMoney;
            arrWalletTransaction.dateGroupTransaction = dateGroupTransaction;
            arrWalletTransaction.moneyIn = moneyIn;
            arrWalletTransaction.moneyOut = moneyOut;
        })
        arrWalletTransactions.totalAllMoneyIn = totalAllMoneyIn;
        arrWalletTransactions.totalAllMoneyOut = totalAllMoneyOut;
        arrWalletTransactions.remain = totalAllMoneyIn + totalAllMoneyOut;
       return arrWalletTransactions;
    }
    
}