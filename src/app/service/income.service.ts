import { LocalService } from './local.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class InCome{
    constructor(private Http: Http,
        private LocalService:LocalService
        
    ){

    }

    // LẤY TẤT CẢ CÁC THU NHẬP
    getDataIncomes(): Promise<any>{
        return this.Http.get(this.LocalService.URL + '/api/income')
        .toPromise()
        .then(response => response.json())
        .catch(err => err);
    }
}