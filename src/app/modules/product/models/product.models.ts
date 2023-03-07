export interface ProductListingFilter {
  page: number;
  perPage: number;
  price_min: number;
  price_max: number;
  language?: string;
  search_key?: string;
  brandName?: Array<any>;
  category?: string;
  attributes?: Array<any>;
  subcategory1?: string;
  subcategory2?: string;
  subcategory3?: string;
  subcategory4?: string;
  subcategory5?: string;
  countryOrigin?: Array<any>;
  minimum_price?: boolean;
  minimum_distance?: boolean;
  best_offers?: boolean;
  longitude: any;
  latitude: any;
  sort?: string;
  shop_by?:string;
  searchKey: any;
}

export interface PriceRangeSlider {
  floor?: number;
  ceil?: number;
}
