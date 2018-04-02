import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-choose-date-report',
  templateUrl: './choose-date-report.component.html',
  styleUrls: ['./choose-date-report.component.scss']
})
export class ChooseDateReportComponent {

  arrayDate = [];
  stingDate: String;
  date = new Date();
  @Output() objDate: EventEmitter<object> = new EventEmitter<object>();
  modelDate = {
    "start": '',
    "end": '',
  }

  constructor(private modalService: NgbModal,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,) {
    
      this.toastr.setRootViewContainerRef(vcr);
    this.stingDate = this.fomatdate(new Date().getTime());
  }

  open(content){
    this.modalService.open(content, { windowClass: 'modalChooseDate' });
  }

  fomatdate(time){
    let date = new Date(time);
    return new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString() + " - " + new Date(date.getFullYear(), date.getMonth()+1, 0).toLocaleDateString();
  }

  // SAVE LẠI NGÀY
  submitSave(){
    if(this.modelDate.start == '' || this.modelDate.end == ''){
      this.toastr.warning('Bạn trưa chọn ngày ! ', 'Waring ! ');
    }else{
      this.stingDate = this.fomatDateTwoTime(this.modelDate.start , this.modelDate.end);
      $(".modalChooseDate").hide();
      $(".modal-backdrop").hide();
      this.objDate.emit(this.modelDate);
    }
  }

  fomatDateTwoTime(time1, time2){
    let date = new Date(new Date(time1).getTime()).toISOString().slice(0, 10);
    let date1 = new Date(new Date(time2).getTime()).toISOString().slice(0, 10);
    return date + ' - ' + date1;
  }

}
