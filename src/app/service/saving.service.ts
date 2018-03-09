import { ISaving } from './../model/saving.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SavingService {
    // urlSb = new Subject<String>();
    //return a id / saving
    getSavingIdSb = new Subject<String>();

    //return list savings
    getSavingsSb: BehaviorSubject<ISaving[]> = new BehaviorSubject(new Array());

    // return a saving - id
    getSavingSb = new Subject<ISaving>();
    // getSavingSb = new Subject<ISaving[]>();

    _iduser: String;
    constructor(private http: Http) { 
        this._iduser = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    get savings(){
        return this.getSavingsSb.asObservable();
    }
    
    getSavings(){
        return this.http
        .get('http://localhost:3000/api/saving/get?userid='+this._iduser)
        .subscribe((response: Response) => 
        {
            this.getSavingsSb.next(response.json());
            return <ISaving[]>response.json();
        })
    }

    getSavingById(id){
        return this.http
        .get('http://localhost:3000/api/saving/get/'+id)
        .subscribe((response: Response) => {
            return this.getSavingSb.next(response.json());
        })
    }

    // THÊM KHOẢN TIẾT KIỆM
    addSaving(saving:ISaving){
        saving.userid = this._iduser;
        return this.http.post('http://localhost:3000/api/saving/create/',saving)
        .subscribe(
            res=> console.log('Add Complete')
        )
    }

    updateSaving(id,saving:ISaving){
        return this.http
        .put('http://localhost:3000/api/saving/update/'+id,saving)
        .catch(this.handleError)
        .subscribe(
            res=>console.log('Update Complete')
        )
    }

    deleteSaving(id){
        return this.http
        .delete('http://localhost:3000/api/saving/delete/'+id)
        .catch(this.handleError)
        .subscribe(
            res=>console.log('Delete Complete')
        )
    }

    getWallet(){
        return this.http
        .get('http://localhost:3000/api/wallets/get')
        .catch(this.handleError)
        .map((response:Response)=>{
            return <ISaving>response.json()
        })
    }

    private handleError(error:Response){
        return Observable.throw(error.statusText);
    }
}