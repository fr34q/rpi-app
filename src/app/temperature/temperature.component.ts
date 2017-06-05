import { Component, OnDestroy } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
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
    this.httpGet('latest')
      .subscribe((data) => this.latestData = data);
  }

  getApiLink(resource: string) {
    const origin = window.location.hostname === "localhost"
      ? "https://fr34q.goip.de:17455" : window.location.origin;
    return origin + "/api/templogger/" + resource;
  }
  httpGet(resource: string, parameter?: { [key: string]: string }) {
    const url = this.getApiLink(resource);
    const par = new URLSearchParams();
    if (parameter != null) {
      for (const key in parameter) {
        par.set(key, parameter[key]);
      }
    }
    return this.http.get(url, { search: par }).map(r => r.json());
  }
}
