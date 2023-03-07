import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Toastr} from '../common/class/toastr';
import {apiList} from '../../assets/values/apiList';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Array<any> = [];
  imageBasePath: string = environment.apiUrl + '/uploads/';

  activeCategoryId: string = '';

  constructor(private api: ApiService, private toastr: Toastr, private router: Router) {
  }

  ngOnInit(): void {

    this.api.get(apiList.categoryFetch, {language: 'english'})
      .subscribe((response: any) => {

        this.categoryList = response.data;
        // console.log(this.categoryList);
        if (this.categoryList.length){
          this.activeCategoryId = this.categoryList[0]._id;
        }

      }, ((error) => {
        this.toastr.openToastr('Error', error, 'API Error');
      }));
  }

  stringSlice(txt:any, cutnum:number){
    return txt.length > cutnum ? txt.substring(0, cutnum)+"..." : txt;
  }

  goToProductList(category: string): void {
    console.log(category);
    this.router.navigate(['/product/product-list'], { queryParams: { category } });
  }

}
