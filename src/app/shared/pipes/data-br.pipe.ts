import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data',
})
export class DataBrPipe implements PipeTransform {
  transform(dateIn: string): string {
    if (!dateIn) return '';

    const datetimeArr = dateIn.split(' ');
    const dateArr = datetimeArr[0].split('-');
    const brDate =
      dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0] + ' ' + datetimeArr[1];

    return brDate;
  }
}
