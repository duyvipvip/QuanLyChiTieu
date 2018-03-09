import { SavingService } from './../../../service/saving.service';
import { ISaving } from './../../../model/saving.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listsaving',
  templateUrl: './listsaving.component.html',
  styleUrls: ['./listsaving.component.scss']
})
export class ListsavingComponent{
  dataSavings: ISaving[];
  constructor(private SavingService:SavingService,
  ) { 
    this.getDataSavings();
  }

  getDataSavings() {
    this.SavingService.getSavings();
    this.SavingService.savings.subscribe((data) => {
      this.dataSavings = data;
    })
  }
}