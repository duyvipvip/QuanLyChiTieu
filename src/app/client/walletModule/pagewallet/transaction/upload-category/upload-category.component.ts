import { Expense } from './../../../../../service/expense.service';
import { InCome } from './../../../../../service/income.service';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-upload-category',
  templateUrl: './upload-category.component.html',
  styleUrls: ['./upload-category.component.scss']
})
export class UploadCategoryComponent implements OnInit {

  // URL HÌNH ẢNH
  public url: String = 'http://localhost:3000/images/default.png';
  public nameCategory = '';
  public strGroup = 'income';
  public fileToUpload: File = null;


  constructor(
    private InCome: InCome,
    private Expense:Expense,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,) 
    {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
  }

  chooseGroup(strGroup){
    this.strGroup = strGroup;
    if(strGroup == 'income'){
      $("#clickincome" ).addClass("active");
      $("#clickexpense" ).removeClass("active");
    }else if(strGroup == 'expense'){
      $("#clickexpense" ).addClass("active");
      $("#clickincome" ).removeClass("active");
    }
  }

  // LẤY FILE
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        this.fileToUpload = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]); 
        reader.onload = (event: any) => { 
            this.url = event.target.result;
        }
    }
  }

  submitSave(){
    if(this.url == 'http://localhost:3000/images/default.png'){
      this.toastr.warning('Bạn trưa chọn hình ảnh ! ', 'Waring ! ');
    }else if(this.nameCategory == ''){
      this.toastr.warning('Bạn nhập tên category ! ', 'Waring ! ');
    }else{
      if(this.strGroup == 'income'){
        let objIncome = {
          name: this.nameCategory,
          detect: this.strGroup
        }
        this.InCome.createIncome(objIncome).then((result) => {
          this.InCome.uploadImage(result._id, this.fileToUpload).then(() => {
            this.reloadData();
            $('#modalAddCategory').modal('hide');
            this.toastr.success('Thêm category thành công ! ', 'Success ! ');
          })
        })
        .catch((err)=>{

        })
      }else if(this.strGroup == 'expense'){
        let objExpense = {
          name: this.nameCategory,
          detect: this.strGroup
        }
        this.Expense.createExpense(objExpense).then((result) => {
          this.Expense.uploadImage(result._id, this.fileToUpload).then(() => {
            this.reloadData();
            $('#modalAddCategory').modal('hide');
            this.toastr.success('Thêm category thành công ! ', 'Success ! ');
          })
        })
        .catch((err) => {

        })
      }
    }
  }

  reloadData(){
    // lấy lại danh sách income
    this.InCome.getDataIncomes();
    // lấy lại danh sách expense
    this.Expense.getDataExpense();
  }

}
