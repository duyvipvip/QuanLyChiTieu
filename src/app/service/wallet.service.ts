import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
}