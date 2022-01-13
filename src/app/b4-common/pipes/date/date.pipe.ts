import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DatePipe implements PipeTransform {

  transform(value: string | undefined | null): unknown {

    if(!value || isNaN(Date.parse(value))) {
      console.warn('[DatePipe] failed to format date: ' + value);
      return '';
    }

    const date = new Date(value);

    let day = date.getDate() + '';
    let month = (date.getMonth()) + 1 + ''

    if (day.length === 1) {
      day = '0' + day;
    }

    if (month.length === 1) {
      month = '0' + month;
    }
    return day + '/' + month + '/' + date.getFullYear();
  }

}
