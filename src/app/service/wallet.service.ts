import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { IWallet } from '../model/wallet.model';
import 'rxjs/add/operator/map';

@Injectable()
export class Wallet{
    
    constructor(private Http:Http){}
    
    // LẤY TẤT CẢ CÁC VÍ
    getDataWallets(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/wallet')
        .toPromise()
        .then(response => response.json())
        .catch(err => err);
    }
    
    // LẤY VÍ CÓ ID LÀ
    getDataWalletId(id): Promise<any>{
        return this.Http.get(`http://localhost:3000/api/wallet/${id}`)
        .toPromise()
        .then(response => response.json())
        .catch(err => err);
    }
    
    // LẤY TỔNG TIỀN CÁC VÍ
    getTotalWallet(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/wallet')
        .toPromise()
        .then((response) => {
            let total = 0;
            response.json().data.forEach((value) => {
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
        console.log(wallet);
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
}