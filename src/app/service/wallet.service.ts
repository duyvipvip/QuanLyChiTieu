import { Local } from './../client/utils/local';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { IWallet } from '../model/wallet.model';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WalletService{
    private _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    
    // LẤY TẤT CẢ CÁC VÍ
    private _allWallet:BehaviorSubject<IWallet[]> = new BehaviorSubject(new Array());
    
    // LẤY 1 VÍ
    private _onlyWallet:BehaviorSubject<IWallet> = new BehaviorSubject<IWallet>(null);
    
    constructor(private Http:Http,
    private Local:Local){
    }
    
    // LẤY TẤT CẢ CÁC VÍ TỪ SUBJECT
    get getAllWallet(){
        return this._allWallet.asObservable();
    }

    // LẤY 1 VÍ TỪ SUBJECT
    get_onlyWallet(){
        return this._onlyWallet.asObservable();
    }

    // LẤY TẤT CẢ CÁC VÍ
    getDataWallets(): Promise<any>{
        return this.Http.get(this.Local.URL+'api/wallet/all?iduser='+this._iduser)
        .toPromise()
        .then(wallets => {
            let data = [];
            return this.Http.get(this.Local.URL+'api/transaction/alltransaction')
                .toPromise()
                .then((transactions) => {
                    wallets.json().forEach(wallet => {
                        let temp = [];
                        let totalMoney = 0;
                        // PHẦN SỬ LÝ LẤY CÁC GIAO DỊCH CHO VÀO 1 VÍ
                        transactions.json().forEach(transaction => {
                            if(wallet._id == transaction.idwallet){
                                temp.push(transaction);
                                totalMoney += Number(transaction.moneytransaction);
                            }
                        });
                        wallet.money = totalMoney;
                        wallet.transactions = temp;
                        data.push(wallet);

                        this._allWallet.next(data);
                        return data;

                    });
                });
        })
        .catch(err => err);
    }
    
    // LẤY VÍ MỘT VÍ
    getDataWalletId(idwallet): Promise<any>{
        let iduser = this._iduser;
        return this.Http.get(`http://localhost:3000/api/wallet/only?idwallet=`+idwallet + "&iduer="+iduser)
        .toPromise()
        .then(data => {
            this._onlyWallet.next(data.json());
            return data.json();
        })
    }
   
    // CHỈNH SỬA 1 VÍ
    updateDataWallet(wallet: IWallet){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
       return this.Http.post(this.Local.URL+'api/wallet/update', JSON.stringify(wallet), {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

    // THÊM 1 VÍ
    addDataWallet(wallet: IWallet){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Put
          });
       return this.Http.put(this.Local.URL+'api/wallet/create', JSON.stringify(wallet), {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

     // XOÁ 1 VÍ
     deleteDataWallet(idwallet){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Delete
        });
       return this.Http.post(this.Local.URL+'api/wallet/delete', { "idwallet": idwallet }, {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

   
}