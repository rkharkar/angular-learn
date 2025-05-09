import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

/**
 * FromNowPipe let's us convert a date into a human-readable relative-time
 * such as "10 minutes ago".
 */
@Pipe({
  name: 'fromNow',
  standalone: false
})
export class FromNowPipe implements PipeTransform {
  transform(value: any): string {
    return moment(value).fromNow();
  }
}

export const fromNowPipeInjectables: Array<any> = [
  FromNowPipe
];
