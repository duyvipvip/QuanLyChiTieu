import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class Expense{
    constructor(private Http: Http){

       
    }
     // LẤY TẤT CẢ CÁC CHI TIÊU
     getDataExpense(): Promise<any>{
        return this.Http.get('http://localhost:3000/api/expense')
                .toPromise()
                .then(result => result.json())
                .catch(err => err);
    }
}