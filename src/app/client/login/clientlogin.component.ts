import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from './../../service/user.service';
import { Router, ActivatedRoute ,Params } from '@angular/router';
import { AuthenticationService } from './../../service/Authentication.service';
import { Component , ViewContainerRef} from "@angular/core";
import { empty } from 'rxjs/observable/empty';

@Component({
    moduleId:module.id,
    selector: 'clientlogin',
    styleUrls: ['./clientlogin.component.scss'],
    templateUrl: './clientlogin.component.html'
})

export class ClientLoginComponent{
    model: any = {};

    constructor(
        private AuthenticationService:AuthenticationService,
        private UserService: UserService,
        private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private Router:Router){
        this.toastr.setRootViewContainerRef(vcr);
            
        // let token = JSON.parse(localStorage.getItem('currentUser')) || null;
        // if(token){
        //     this.Router.navigateByUrl('/');
        // }
        this.activatedRoute.params.subscribe((params: Params) => {
            let token = params['token'];
            if(token != undefined){
                this.UserService.getUser(token)
                    .then((user) => {
                        console.log(user);
                        let obj ={
                            "token": token,
                            "username": user.username,
                            "hinhanh": user.hinhanh,
                            "email": user.email,
                            "_id": user._id,
                        }
                        localStorage.setItem('currentUser', JSON.stringify(obj));
                        this.Router.navigateByUrl('/');
                    })
                    .catch((err) => {
                    })
            }else{
            }
          });
    }
    login(){
        this.AuthenticationService.login(this.model).then((result) => {
            if(result.statusCode == 200){
                this.toastr.success(result.message + ' ! ', 'Success ! ');
                this.Router.navigateByUrl('/');
            }else if(result.statusCode == 400){
                this.toastr.warning(result.message + ' ! ', 'Warning ! ');
            }
        });
    }
}