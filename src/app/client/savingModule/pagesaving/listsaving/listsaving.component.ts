import { SavingService } from './../../../../service/saving.service';
import { ISaving } from './../../../../model/saving.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listsaving',
  templateUrl: './listsaving.component.html',
  styleUrls: ['./listsaving.component.scss']
})
export class ListsavingComponent implements OnInit {
  dataSavings: ISaving[];
  dataCompleted: ISaving[] = [];
  timeNow = Date.now();
  constructor(private savingService: SavingService) {
    // lấy tất cả các giao dich
    this.getAllSaving();
  }

  ngOnInit() {

  }

  // LẤY TOÀN BỘ KHOẢN TIẾT KIỆM
  getAllSaving() {
    this.savingService.getSavings().then((result) => {
      this.savingService.get_allSaving()
        .subscribe((result) => {
          this.dataSavings = result;
        })
    })
  }


}
