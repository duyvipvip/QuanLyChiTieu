import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Debt_LoanSevice{

    constructor(private Http: Http){
    }

    getDataDebt_Loans(){
        return this.Http.get('http://localhost:3000/api/debt-loan')
        .toPromise()
        .then((result => result.json()))
        .catch(err => err);
    }
}