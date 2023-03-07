import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

export interface LoaderState {
  show: boolean;
}

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription = new Subscription();

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.subscription = this.commonService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
