import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: "app-changepassword",
    styleUrls: ["./changePassword.component.scss"],
    templateUrl: "./changePassword.component.html"
})

export class ChangePasswordComponent {

    formChange: FormGroup;
    oldPassword: String;
    newPassword: String;
    confirmPassword: String;
    user = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private _userService: UserService,public toastr: ToastsManager, vcr: ViewContainerRef, private frmbuilder: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.formChange = frmbuilder.group({
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)],validPassword],
        });
        function validPassword(control: AbstractControl) {
            return observableOf(control.parent.get('newPassword').value !== control.parent.get('confirmPassword').value).pipe(
                map(result => result ? { invalid: true } : null)
            );
        }
    }

    ngOnInit() { }

    PostData(dataForm: NgForm) {
        var data = {
            oldPassword: dataForm.controls['oldPassword'].value,
            newPassword: dataForm.controls['newPassword'].value,
            confirmPassword: dataForm.controls['confirmPassword'].value
        }
        this._userService.changePassword(data,this.user.token).then(res => {
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