import { LocalService } from './local.service';
import { ITransaction } from './../model/transaction.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http , RequestOptions, RequestMethod, Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService{
    private _iduser = '';
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    constructor(private Http:Http,
        private LocalService:LocalService,
    ){
        this._iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    }
    private _allTransaction:BehaviorSubject<ITransaction[]> = new BehaviorSubject(new Array());
    
    get getAllTransaction(){
        return this._allTransaction.asObservable();
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
    getTransactions(idwallet){
        return this.Http.get(this.LocalService.URL + '/api/transaction/all?idwallet='+ idwallet)
            .toPromise()
            .then((data) => {
                let resultThenFormat = this.formatArrayWalletTransaction(data.json());
                this._allTransaction.next(resultThenFormat);
                return resultThenFormat;

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