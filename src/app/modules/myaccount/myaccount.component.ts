import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('my-account-page');
    document.querySelectorAll('.mobile-view-header .profile-heading')[0].innerHTML = "My Account";
  }

  ngOnDestroy():void {
    document.body.classList.remove('my-account-page');
    document.querySelectorAll('.mobile-view-header .profile-heading')[0].innerHTML = "";
  }

}
