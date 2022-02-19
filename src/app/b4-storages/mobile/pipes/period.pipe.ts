import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(value?: { days?: number, hours?: number, minutes?: number } | null): string {
    let period = '';
    if (!value) return '';
    if (!!value.days) {
      period += (value.days + ' jours ');
    }

    if (!!value.hours) {
      period += (value.hours + ' heures ');
    }

    if (!!value.minutes) {
      period += (value.minutes + ' minutes');
    }

    return period;
  }

}
