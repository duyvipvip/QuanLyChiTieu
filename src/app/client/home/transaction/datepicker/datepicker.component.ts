import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-datepicker',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.scss'],
})

export class DatePickerComponent{
    @Input() date;
}