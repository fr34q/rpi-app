import { Component, OnDestroy } from '@angular/core';
import {Http} from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';

interface SensorData {
  temperature: number;
  humidity: number;
  timestamp: string;
}

@Component({
  selector: 'temperature',
  styleUrls: ['./temperature.component.css'],
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent implements OnDestroy {
  constructor(
    private http: Http
  ) {
    this.getCurrentSensorDataAsync();
    this.intervalSubscription = Observable.interval(5000).subscribe(() => this.getCurrentSensorDataAsync());
  }
  
  latestData: SensorData;

  private intervalSubscription: Subscription;
  
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  getCurrentSensorDataAsync() {
    //var url = window.location.origin + "/api/templogger/latest";
    var url = "http://192.168.0.17/api/templogger/latest";

    this.http.get(url).map(resp => resp.json())
               .subscribe((data) => this.latestData = data);
  }
}
