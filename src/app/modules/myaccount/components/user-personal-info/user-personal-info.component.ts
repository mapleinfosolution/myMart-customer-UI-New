import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {
  @Input() userDetails: any = {};
  @Input('defaultAddressList') defaultAddressList: any =[];
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  imageUrl(imagePath: string): any {
    if (imagePath) {
      return this.commonService.getImageUrl1(imagePath);
    } else {
      return '';
    }
  }

  showName(): string {
    let name = '';
    name = ((this.userDetails.firstname) ? this.userDetails.firstname.substr(0, 1) : '' ) + ((this.userDetails.lastname) ? this.userDetails.lastname.substr(0, 1) : '');
    return name;
  }

}
