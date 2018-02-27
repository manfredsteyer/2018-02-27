import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Flight } from './entities/flight';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

    private flightSelectedSubject = new ReplaySubject<Flight>(3);
    readonly flightSelected$: Observable<Flight> = this.flightSelectedSubject.asObservable();

    publishFlight(flight: Flight): void {
        this.flightSelectedSubject.next(flight);
    }
}