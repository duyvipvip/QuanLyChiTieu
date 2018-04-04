import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if(value == args[0]){
            return `<span class="search-highlight">${value}</span>`;
        }
        return value;
    }
}