import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'singerFilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[],type:string): any {
        if (!items || !type) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        if(type =='artist'){
            return items.filter(item => item.type == type);
        }
        return items.filter(item => item.album.album_type == type);
    }
}