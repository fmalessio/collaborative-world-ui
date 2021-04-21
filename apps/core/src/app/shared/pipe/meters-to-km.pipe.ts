import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToKM'
})
export class MetersToKMPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (!value) {
      return 'unknow Km';
    }
    let km = value / 1000;
    return km.toFixed(1) + " Km";
  }

}
