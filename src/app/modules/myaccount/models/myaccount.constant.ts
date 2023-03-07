import { OrderListTabsModel } from './myaccount.models';

export const OrderListTabs: OrderListTabsModel[] = [
  { title: 'All', active: true, status: '' },
  { title: 'To Pay', active: false, status: 'toPay' },
  { title: 'To Ship', active: false, status: 'toShip' },
  { title: 'To Receive', active: false, status: 'toReceive' },
  { title: 'To Review', active: false, status: 'toReview' }
];
