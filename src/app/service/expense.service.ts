import { LocalService } from './local.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class Expense{
    constructor(private Http: Http,
        private LocalService:LocalService
    ){

       
    }
     // LẤY TẤT CẢ CÁC CHI TIÊU
     getDataExpense(): Promise<any>{
        return this.Http.get(this.LocalService.URL + '/api/expense')
                .toPromise()
                .then(result => result.json())
                .catch(err => err);
    }
}