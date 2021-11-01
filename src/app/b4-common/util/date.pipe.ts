import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DatePipe implements PipeTransform {

  transform(value: string | undefined): unknown {
    if (!value) return '';
    const date = new Date(value);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

}
