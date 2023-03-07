import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  isLargeScreen: boolean;

  constructor() {
    this.isLargeScreen = this.checkLargeScreen();
  }

  checkLargeScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 1024;
  }
}
