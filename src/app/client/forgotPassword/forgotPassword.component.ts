import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: "app-forgotPassword",
    styleUrls: ["./forgotPassword.component.scss"],
    templateUrl: "./forgotPassword.component.html"
})

export class ForgotPasswordComponent {

    formChange: FormGroup;
    email: String;
    question: String;

    constructor(private _userService: UserService,public toastr: ToastsManager, vcr: ViewContainerRef, private frmbuilder: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.formChange = frmbuilder.group({
            email: ['', [Validators.required,Validators.email]],
            question: ['', [Validators.required]],
        });
    }

    ngOnInit() { }

    PostData(dataForm: NgForm) {
        var data = {
            email: dataForm.controls['email'].value,
            question: dataForm.controls['question'].value,
        }
        this._userService.forgotPassword(data).then(res => {
            if (res.statusCode === 200) {
                this.toastr.success(res.message);
            }
            else if (res.status === 400) {
                this.toastr.error(res.json().message);
            }            
        }).catch(err => {
            this.toastr.error(err);
        })
    }
}