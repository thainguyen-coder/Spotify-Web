import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe   ({
    name: 'timeCustomPipe'
})
export class TimeCustomPipe implements PipeTransform{
  
    transform (value : number | string) : string {
        const minutes = Math.floor(+value / 60000);
        const seconds = ((+value % 60000) / 1000).toFixed(0);
        return minutes + ":" + (+seconds < 10 ? '0' : '') + seconds;
        // return moment(value).format('HH:mm:ss');
      }

}