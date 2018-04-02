import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalService } from './local.service';
import { Http , RequestOptions, RequestMethod, Headers} from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class Expense{
    private _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    token = JSON.parse(localStorage.getItem('currentUser')).token;

    private _allExpense:BehaviorSubject<any> = new BehaviorSubject(new Array());
    
    getAllExpense(){
        return this._allExpense.asObservable();
    }

    constructor(private Http: Http,
        private LocalService:LocalService
    ){

       
    }
     // LẤY TẤT CẢ CÁC CHI TIÊU
     getDataExpense(): Promise<any>{
        return this.Http.get(this.LocalService.URL + '/api/expense?iduser='+this._iduser)
                .toPromise()
                .then(result => {
                    this._allExpense.next(result.json());
                    return result.json()
                })
                .catch(err => err);
    }

    // XOÁ EXPENSE
    deleteExpense(idexpense){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/expense/delete?idexpense='+idexpense,JSON.stringify({}), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
    }

    // TẠO MỚI MỘT INCOME
    createExpense(expense){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/expense', JSON.stringify(expense), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
    }

    // // GỬI HÌNH ANH
    uploadImage(idexpense, file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        const headers = new Headers({'x-access-token': this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
          
        return this.Http.post(this.LocalService.URL + '/api/expense/image?idexpense='+ idexpense, formData, {headers:headers})
            .toPromise()
            .then((data) => {
                return data.json();
            })
            .catch((err) => {
                return err;
            })
    }
}