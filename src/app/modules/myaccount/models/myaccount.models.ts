export interface OrderFilterModel {
  status?: string;
  page?: number;
  perPage?: number;
}

export interface OrderListTabsModel {
  title: string;
  active: boolean;
  status: string;
}