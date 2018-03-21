import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weekday'
})

export class WeekDayPipe implements PipeTransform {
    transform(value: any): any {
        let array = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
        return array[new Date(value).getDay()];
    }
}