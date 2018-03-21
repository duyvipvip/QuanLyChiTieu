import { LocalService } from './local.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private Http: Http,
        private LocalService: LocalService,
    ) {
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser.token;
    }

    login(user) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
        return this.Http.post(this.LocalService.URL +'/api/auth/login', JSON.stringify(user), {headers:headers})
        .toPromise()
        .then((response) => {
            if(response.json().statusCode == 400){
                return {
                    "statusCode": 400,
                    "message": response.json().message,
                }
            }else if(response.json().statusCode == 200){
                let obj ={
                    "token": response.json().token,
                    "username": response.json().username,
                    "hinhanh": response.json().hinhanh,
                    "email": response.json().email,
                }
                localStorage.setItem('currentUser', JSON.stringify(response.json()));
                return {
                    "statusCode": 200,
                    "message": response.json().message,
                }
            }
        })
        .catch(err => err);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }
}