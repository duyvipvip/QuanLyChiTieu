import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'numberpipe'
})

export class NumberPipe implements PipeTransform{
    transform(value){
        return (value < 0) ? value * -1 : value;
    }
}