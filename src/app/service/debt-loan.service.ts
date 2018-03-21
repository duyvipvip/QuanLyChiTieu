import { LocalService } from './local.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Debt_LoanSevice{

    constructor(private Http: Http,
    private LocalService:LocalService
    ){
    }

    getDataDebt_Loans(){
        return this.Http.get(this.LocalService.URL + '/api/debt-loan')
        .toPromise()
        .then((result => result.json()))
        .catch(err => err);
    }
}