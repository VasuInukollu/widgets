import { TimeagoClock } from 'ngx-timeago';
import { Observable, interval } from 'rxjs';

// ticks every s
export class CustomClock extends TimeagoClock {
  tick(then: number): Observable<number> {
    return interval(1000);
  }
}
