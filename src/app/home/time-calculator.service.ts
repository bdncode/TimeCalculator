import { Injectable } from '@angular/core';
import { Timeobject } from './timeObject.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface TimeDataInterface {
  description: string;
  timeValue: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TimeCalculatorService {
  private _times = new BehaviorSubject<Timeobject[]>([]);
  private url = 'your url';

  get times() {
    return this._times.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  fetchTimes() {
    return this.httpClient
    .get<{[key: string]: TimeDataInterface}>
      (this.url+'.json')
      .pipe(map(responseData => {
        const times = [];
        for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              times.push(new Timeobject(
                key,
                responseData[key].description,
                responseData[key].timeValue));
            }
          }
        return times;
      }),
      tap(times => {
          this._times.next(times);
        }
      )
    );
  }

  getTime(id: string){
    console.log('strting');
    return this.httpClient
    .get<TimeDataInterface>(this.url+'/'+id+'.json')
    .pipe(map(responseData => {
      console.log(responseData);
      console.log('reading');
      return new Timeobject(id, responseData.description, responseData.timeValue)
    }));

  }

  addTime(timeValue: Date, description: string) {
    let generatedId: string;
    const newTime = new Timeobject('10', description, timeValue);
    return this.httpClient
    .post<{name: string}>(this.url+'.json', {
      ...newTime, id: null
    }).pipe(
      switchMap (responseData => {
        generatedId = responseData.name;
        return this.times;
      }),
      take(1),
      tap(times => {
        newTime.id = generatedId;
        this._times.next(times.concat(newTime));
      })
    );
  }

  updateTime(id: string, timeValue: Date, description: string) {
    let updatedTimes: Timeobject[];
    return this.times.pipe(
      take(1), switchMap(times => {
        const updatedTimeIndex = times.findIndex(t => t.id === id);
        updatedTimes = [...times];
        const oldTime = updatedTimes[updatedTimeIndex];
        updatedTimes[updatedTimeIndex] = new Timeobject(
          oldTime.id,
          description,
          timeValue      
        );
        return this.httpClient
        .put(this.url+'/'+id+'.json',{
          ...updatedTimes[updatedTimeIndex], id: null
        });
      }),tap(() => {
        this._times.next(updatedTimes);
      })
    );
  }  
}
