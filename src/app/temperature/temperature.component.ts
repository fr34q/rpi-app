import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
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

  options: Object = {
    title: { text: 'simple chart' },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2],
    }]
  };

  private intervalSubscription: Subscription;

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  getCurrentSensorDataAsync() {
    const origin = window.location.hostname === "localhost"
      ? "https://fr34q.goip.de:17455" : window.location.origin
    const url = origin + "/api/templogger/latest";

    this.http.get(url).map(resp => resp.json())
      .subscribe((data) => this.latestData = data);
  }
}
