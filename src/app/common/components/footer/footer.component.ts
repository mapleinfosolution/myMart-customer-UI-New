import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public class: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    if(this._router.url == '/') {
      console.log(this._router.url, 'this._router.url');
      this.class = true;
    }
  }

  scrollTopSmooth(num:number):void {
    document.body.scrollTop = num; 
    document.documentElement.scrollTop = num; 
  }

  buttonClick(): void {
    this.class = false;
  }

}
