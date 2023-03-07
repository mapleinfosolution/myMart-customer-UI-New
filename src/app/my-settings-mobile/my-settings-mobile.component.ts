import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-settings-mobile',
  templateUrl: './my-settings-mobile.component.html',
  styleUrls: ['./my-settings-mobile.component.scss']
})
export class MySettingsMobileComponent implements OnInit {

  constructor() { }

  

  ngOnInit(): void {
    document.body.classList.add('my-settings-page');
    document.querySelectorAll('.mobile-view-header .profile-heading')[0].innerHTML = "My Settings";
  }

  ngOnDestroy():void {
    document.body.classList.remove('my-settings-page');
    document.querySelectorAll('.mobile-view-header .profile-heading')[0].innerHTML = "";
  }

}
