import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { WalletService } from './../../../../service/wallet.service';
import { SavingService } from './../../../../service/saving.service';
import { ISaving } from './../../../../model/saving.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-detailsaving',
  templateUrl: './detailsaving.component.html',
  styleUrls: ['./detailsaving.component.scss']
})
export class DetailsavingComponent implements OnInit {
  dataSaving: ISaving = {
    namesaving: '',
    idwallet: '',
    moneyend: 0,
    image: '',
    enddate: null
  };

  // TÊN VÍ
  nameWallet: String;

  constructor(
    private SavingService: SavingService,
    private ActivatedRoute: ActivatedRoute,
    private WalletService: WalletService,
    private Router: Router,
    private modalService: NgbModal,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
      .subscribe((params) => {
        if (params['params'].idsaving != undefined) {
          this.SavingService.getOnlySaving(params['params'].idsaving)
            .then(() => {
              // SỬ DUNG SUBJECT
              this.SavingService.get_onlySaving()
                .subscribe((data) => {
                  this.dataSaving = data;
                  // LẤY TÊN VÍ
                  this.getNameWallet();
                })
            })
        }
      })
  }
  ngOnInit() {
  }

  // MỞ MODAL XEM CÓ XOÁ KHÔNG
  openModalDelete(content) {
    this.modalService.open(content, { windowClass: 'modalDelete' });
  }

  // LẤY TÊN VÍ 
  getNameWallet() {
    this.WalletService.getDataWalletId(this.dataSaving.idwallet)
      .then((data) => {
        this.nameWallet = data.namewallet;
      })
  }

  // KHI NGƯỜI DÙNG NHẤP VÀO SỬ DỤNG SỐ TIỀN ĐÓ
  use() {
    this.SavingService.useSaving(this.dataSaving).then((data) => {
      this.reloadData();
      this.toastr.success("Bạn đã sử dụng khoản tiết kiệm thành công", "Success");
    }).catch((err) => {
      this.toastr.warning("Bạn đã sử dụng khoản tiết kiệm thất bại", "warning");
    });
  }

  // LẤY DỮ LIỆU 1 KHOẢN TIẾT KIỆM
  getSaving() {

  }

  // XOÁ ĐI MỘT KHOẢN TIẾT KIỆM
  deleteSaving() {
    this.SavingService.deleteSaving(this.dataSaving._id)
      .then((data) => {
        this.toastr.success("Xoá khoản tiết kiệm thành công", "Success");
        this.Router.navigateByUrl('/savings');
      })
      .catch((err) => {
        this.toastr.warning("Xoá khoản tiết kiệm thất bại", "Warning");
      })
  }

  // RELOAD DATA
  reloadData() {
    // CẬP NHẬT LẠI 1 SAVING
    this.SavingService.getOnlySaving(this.dataSaving._id);
    // CẬP NHẬT LẠI MẢNG SAVING
    this.SavingService.getSavings();
  }
}
