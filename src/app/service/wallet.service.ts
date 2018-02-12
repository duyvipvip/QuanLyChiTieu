import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { IWallet } from '../model/wallet.model';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class WalletService{
    private _allWallet:BehaviorSubject<IWallet[]> = new BehaviorSubject(new Array());
    private _onlyWallet:BehaviorSubject<IWallet> = new BehaviorSubject({} as IWallet);
    constructor(private Http:Http){}
    
    get getAllWallet(){
        return this._allWallet.asObservable();
    }

    get getonlyWallet(){
        return this._onlyWallet.asObservable();
    }

    // LẤY TẤT CẢ CÁC VÍ
    getDataWallets(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/wallet')
        .toPromise()
        .then(data => {
            this._allWallet.next(data.json());
            return data.json();
        })
        .catch(err => err);
    }
    
    // LẤY VÍ CÓ ID LÀ
    getDataWalletId(id): Promise<any>{
        return this.Http.get(`http://localhost:3000/api/wallet/${id}`)
        .toPromise()
        .then(data => {
            //this._onlyWallet.next(data.json());
            return data.json();
        })
        .catch(err => err);
    }
    
    // LẤY TỔNG TIỀN CÁC VÍ
    getTotalWallet(){
        return this.Http.get('http://localhost:3000/api/wallet')
        .toPromise()
        .then(data => {
            let total = 0;
            data.json().forEach((value) => {
                total += value.money;
            })
            return total;
            
        })
        .catch(err => err);
       
    }
   
    // UPDATE 1 VI
    updateDataWallet(wallet: IWallet){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
       return this.Http.post('http://localhost:3000/api/wallet/update/'+wallet._id, JSON.stringify(wallet), {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

    // ADD 1 VÍ
    addDataWallet(wallet: IWallet){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Put
          });
       return this.Http.put('http://localhost:3000/api/wallet/add', JSON.stringify(wallet), {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

     // REMOVE 1 VÍ
     deleteDataWallet(id){
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Delete
          });
       return this.Http.delete('http://localhost:3000/api/wallet/delete/'+ id, {headers:headers})
       .toPromise()
       .then((response) => {
           return response;
       })
       .catch(err => err);
    }

    // THÊM GIAO DỊCH CHO VÍ
    addTransactionWallet(transition){
        console.log(transition);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post('http://localhost:3000/api/wallettransaction/create', JSON.stringify(transition), {headers:headers})
        .toPromise()
        .then((response) => {
           return response;
        })
        .catch(err => err);
    }
}