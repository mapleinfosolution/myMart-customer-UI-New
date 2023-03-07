export interface ConfirmationPopupData {
  title?: string;
  message: string;
  ok?: boolean;
  cancel?: boolean;
  okTitle?: string;
  cancelTitle?: string;
}

export interface KeyValueNumber {
  key: number;
  value: number;
}

export interface PaginationModel {
  page?: number;
  perPage?: number;
}
