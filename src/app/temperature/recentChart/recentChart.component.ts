import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import * as Highcharts from "highcharts";

interface SensorData {
    temperature: number;
    humidity: number;
    timestamp: string;
}

@Component({
    selector: 'recent-chart',
    styles: ['chart { display: block; }','md-spinner { margin: auto; }'],
    template: `<div>
                 <md-spinner *ngIf="showSpinner"></md-spinner>
                 <chart [options]="options" *ngIf="showChart"></chart>
               </div>`
})
export class RecentChartComponent implements OnChanges {
    @Input() seconds: string;

    options: Highcharts.Options;
    loading: boolean = false;

    get showChart(): boolean {
        return !this.loading && this.options.series.length > 0;
    }
    get showSpinner(): boolean {
        return this.loading;
    }

    constructor(
        private http: Http
    ) {
        this.options = this.getOptionsFromSeries([]);
        Highcharts.setOptions({                                            // This is for all plots, change Date axis to local timezone
            global: {
                useUTC: false
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('seconds')) {
            const change = changes['seconds'];
            if (change.currentValue != null) {
                this.getRecentSensorDataAsync(change.currentValue);
                console.log("Seconds: ", this.seconds, "current: ", change.currentValue);
            }
        }
    }

    getRecentSensorDataAsync(seconds: string) {
        if (seconds == null || parseInt(seconds) === NaN || parseInt(seconds) <= 0) {
            console.log(seconds, parseInt(seconds));
            return;
        }
        console.log("loading: ", this.loading);
        this.loading = true;
        this.httpGet('recent', { 'secs': seconds })
            .subscribe((data) => {
                this.options = this.getOptionsFromSeries(this.calculateChartSeries(data));
                this.loading = false;
            });
    }

    calculateChartSeries(data: SensorData[]): Highcharts.IndividualSeriesOptions[] {
        return [{
            name: "Temperature",
            data: data.map(s => [this.convertTimeStringToMillis(s.timestamp), s.temperature]),
            yAxis: 0
        }, {
            name: "Humidity",
            data: data.map(s => [this.convertTimeStringToMillis(s.timestamp), s.humidity]),
            yAxis: 1
        }];
    }
    convertTimeStringToMillis(date: string) {
        return Date.parse(date);
    }
    getOptionsFromSeries(series: Highcharts.IndividualSeriesOptions[]): Highcharts.Options {
        return {
            title: { text: '' },
            /*chart: {
              events: {
                load: (() => {
                  const component = this;
                  return function () {
                    console.log("Old Series: ", this.series);
                    component.httpGet('recent', { 'secs': '60' })
                      .subscribe((data) => {
                        component.recentData = data;
                        this.series = component.calculateChartSeries(data);
                        console.log("Series: ", this.series);
                      })
                  }
                })()
              }
            },*/
            xAxis: {
                type: 'datetime'
            },
            yAxis: [{
                labels: {
                    format: '{value}°C'
                },
                title: {
                    text: 'Temperature'
                }
            }, {
                gridLineWidth: 0,
                labels: {
                    format: '{value}%'
                },
                title: {
                    text: 'Humidity'
                },
                opposite: true
            }],
            series: series
        };
    }

    // TODO: Move to service?
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
        console.log(url, parameter, par);
        return this.http.get(url, { search: par }).map(r => r.json());
    }
}