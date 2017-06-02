import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

interface NavigationItem {
  name: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private router: Router
  ) {
    this.detectCurrentPage(this.router.url);
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.detectCurrentPage(val.url);
      }
    });
  }

  sidenavOpen: boolean = false;
  currentPage: NavigationItem;

  navigationEntries: NavigationItem[] = [
    { name: 'Home', router: '/', icon: 'home' },
    { name: 'Radio', router: '/radio', icon: 'radio' },
    { name: 'Temperature', router: '/temperature', icon: 'ac_unit' },
    { name: 'About', router: '/about', icon: 'info' }
  ];

  navigate(item: NavigationItem) {
    this.router.navigate([item.router]);
    this.closeSidenav();
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
  closeSidenav() {
    this.sidenavOpen = false;
  }

  detectCurrentPage(url: string) {
    this.currentPage = undefined;
    for (const item of this.navigationEntries) {
      if (item.router === url) {
        this.currentPage = item;
        break;
      }
    }
    this.currentPage = this.currentPage || this.navigationEntries[0];
  }
}
