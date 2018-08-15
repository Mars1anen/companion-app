import { Pipe, PipeTransform } from '@angular/core';
import { TimeToUnixService } from '../services/time-to-unix.service';

@Pipe({
  name: 'unixToString'
})
export class UnixToStringPipe implements PipeTransform {
  constructor(private timeWorker: TimeToUnixService) {}

  transform(value: string): any {
    return this.timeWorker.beautifyUnix(value);
  }

}
