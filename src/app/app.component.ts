import { Component, OnInit } from '@angular/core';
import { CommonStoreService } from './services/api/common-store.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { $ } from 'protractor';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-mart-customer';
  currentRoute: string = '';

  constructor(
    private commonStoreService: CommonStoreService, private router: Router
  ) {
    // get current route
    this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.currentRoute = event.url;
          //console.log(this.currentRoute);
          // check category page and add class to the body
          if (this.currentRoute == '/categories') {
            document.body.classList.add('categories_page');
          } else {
            document.body.classList.remove('categories_page');
          }
        }
      });


  }

  ngOnInit(): void {
    if (localStorage.getItem('userData') && localStorage.getItem('accessToken')) {
      this.commonStoreService.setLoginData(JSON.parse(localStorage.getItem('userData') || '{}'));
      this.commonStoreService.callAfterLogin();
    }

    if (!localStorage.getItem('uniqueId')) {
      localStorage.setItem('uniqueId', uuidv4());
    }

  }
}
