import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { KeyValueNumber } from '../models/common-model';

export const enum RegularExpression {
  Email = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
  Mobile = ''
}

export const ConfirmationPopupConfig: NgbModalOptions = {
  centered: true,
  backdrop: 'static',
  keyboard: false
};

export const  enum CommonMessage {
  okTitle = 'OK',
  cancelTitle = 'Cancel',
  commonError = 'Something went wrong',
  confirmationTitle = 'Confirmation',
  logOutConfirmation = 'Are you sure want to logout?',
  addressDeleteConfirmation = 'Are you sure want to delete the address?'
}

export const PaginationDropdown: KeyValueNumber[] = [
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 20, value: 20 }
]
