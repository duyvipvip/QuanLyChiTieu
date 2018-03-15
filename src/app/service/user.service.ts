import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';


@Injectable()
export class UserService{
    constructor(private Http: Http){

    }

    // ĐĂNG KÍ TÀI KHOẢN
    createUser(user): Promise<any>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
        });
        return this.Http.post('http://localhost:3000/api/user/create', JSON.stringify(user), {headers:headers})
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                return err;
            });
    }

    // LẤY THÔNG TIN CỦA USER
    getUser(token): Promise<any>{
        return this.Http.get(`http://localhost:3000/api/auth/me?token=`+token)
        .toPromise()
        .then(user => {
            return user.json();
        })
        .catch((err) => {
            return err;
        })
    }

    // THAY ĐỔI AVATAR
    updateAvatar(image: File,token) {
        let formData = new FormData();
        formData.append('file', image, image.name);
        const headers = new Headers({'x-access-token': token});
        const options = new RequestOptions({
            headers: headers,
            method: RequestMethod.Post
          });
       return this.Http.post('http://localhost:3000/api/user/avatar', formData, {headers:headers})
       .toPromise()
       .then((response) => {
           return response.json();
       })
       .catch(err => err);
    }

}
