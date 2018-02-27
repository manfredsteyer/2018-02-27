import { Injectable } from '@angular/core';
import { Flight } from '../../entities/flight';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { publish } from 'rxjs/operators';
import { ConnectableObservable } from "rxjs/observable/ConnectableObservable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class FlightService {

  constructor(private http: HttpClient) {
  }

  flights: Flight[] = [];

  private flightsSubject = new BehaviorSubject<Flight[]>([]);
  readonly flights$ = this.flightsSubject.asObservable();


  delay(): void {
    let date = new Date(this.flights[0].date);
    // date.setTime(date.getTime() + 15 * 60 * 1000);
    // this.flights[0].date = date.toISOString();

    let newFlight: Flight = {
      ...this.flights[0],
      date: new Date(date.getTime() + 15 * 60 * 1000).toISOString()
    }

    this.flights = [
      newFlight,
      ...this.flights.slice(1)
    ];

    this.flightsSubject.next(this.flights);

  }



  load(from: string, to: string): void {

    // let o = this.find(from, to).pipe(publish()) as ConnectableObservable<Flight[]>;
    // let o = this.find(from, to).publish();

    // o.connect();

    this.find(from, to).subscribe(
      flights => {
        this.flights = flights;
        this.flightsSubject.next(flights);
      },
      err => console.error('Error loading flights', err)
    );
    
  }

  find(from: string, to: string): Observable<Flight[]> {
    let url = 'http://www.angular.at/api/flight';

    let params = new HttpParams()
      .set('from', from)
      .set('to', to);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});

  }

}
