import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalService } from './local.service';
import { Injectable } from '@angular/core';
import { Http , RequestOptions, RequestMethod, Headers} from '@angular/http';

@Injectable()
export class InCome{
    private _iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    token = JSON.parse(localStorage.getItem('currentUser')).token;
    
    private _allIncome:BehaviorSubject<any> = new BehaviorSubject(new Array());
    
    getAllIncome(){
        return this._allIncome.asObservable();
    }

    constructor(private Http: Http,
        private LocalService:LocalService
        
    ){

    }

    // LẤY TẤT CẢ CÁC THU NHẬP
    getDataIncomes(): Promise<any>{
        return this.Http.get(this.LocalService.URL + '/api/income?iduser='+this._iduser)
        .toPromise()
        .then(response =>{
            this._allIncome.next(response.json());
            return response.json();
        })
        .catch(err => err);
    }

    // XOÁ INCOME
    deleteIncome(idincome){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/income/delete?idincome='+idincome,JSON.stringify({}), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
    }

    // TẠO MỚI MỘT INCOME
    createIncome(income){
        const headers = new Headers({ 'Content-Type': 'application/json', "x-access-token": this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post(this.LocalService.URL + '/api/income', JSON.stringify(income), {headers:headers})
        .toPromise()
        .then((response) => {
           return response.json();
        })
    }

    // // GỬI HÌNH ANH
    uploadImage(idincome, file: File){
        let formData = new FormData();
        formData.append('file', file, file.name);
        const headers = new Headers({'x-access-token': this.token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
          
        return this.Http.post(this.LocalService.URL + '/api/income/image?idincome='+ idincome, formData, {headers:headers})
            .toPromise()
            .then((data) => {
                return data.json();
            })
            .catch((err) => {
                return err;
            })
    }
}