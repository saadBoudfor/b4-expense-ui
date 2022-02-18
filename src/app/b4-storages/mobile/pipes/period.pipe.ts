import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(value: { days?: number, hours?: number, minutes?: number } | undefined): string {
    let period = '';
    if (!value) return '';
    if (!!value.days) {
      period += (value.days + ' Jours ');
    }

    if (!!value.hours) {
      period += (value.hours + ' Heures ');
    }

    if (!!value.minutes) {
      period += (value.minutes + ' minutes');
    }

    return period;
  }

}
