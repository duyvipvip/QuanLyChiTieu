import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class FomatDateService{

    private arrayDay: Array<String> = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4","Thứ 5","Thứ 6","Thứ 7" ];

    constructor(private Http:Http,
        
    ){
    }

    //  CHUYỂN TỪ NGÀY SANG THỨ
    getDay(day){
        return this.arrayDay[day];
    }

    // CHUYỂN DATE SANG TIMEZONE UTC
    convertDatetoUTCDate (datetime) {
        return new Date(Date.UTC(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(),  datetime.getHours(), datetime.getMinutes(), datetime.getSeconds()));
    }
}