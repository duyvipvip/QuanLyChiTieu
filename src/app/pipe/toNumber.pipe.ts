import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toNumber'
})

export class ToNumberPipe implements PipeTransform {
    transform(value: string): any {
        if(value != '' && value != undefined && value != null){
            return value.toString().replace(/,/g, '');
        }
        return value;
        
    }
}