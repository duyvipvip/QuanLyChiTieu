import { Injectable } from '@angular/core';

@Injectable()

export class CheckValueSevice{
    constructor(){

    }

    // KIỂM ITEM TRONG OBJECT CÓ ITEM NÀO RỖNG HAY KHÔNG
    checkItemObjectNull(value): boolean{
        value = Object.values(value);
        for(let i = 0; i< value.length; i++){
            if(value[i] =='' || value[i] == undefined || value[i] == null ){
                return true;
            }
        }
        return false;
    }

    // KIỂM TRA MỘT GIÁ TRỊ CÓ PHẢI LÀ NULL RỖNG UNDEFINED HAY KHÔNG
    checkValueNull(value){
        if(value != undefined && value != '' && value != null){
            return false;
        }
        return true;
    }
}