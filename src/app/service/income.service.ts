import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InCome{
    constructor(private Http: Http){

    }

    // LẤY TẤT CẢ CÁC THU NHẬP
    getDataIncomes(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/income')
        .toPromise()
        .then(response => response.json())
        .catch(err => err);
    }
}