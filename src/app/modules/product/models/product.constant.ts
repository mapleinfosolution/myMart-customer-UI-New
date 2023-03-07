import { ProductListingFilter, PriceRangeSlider } from './product.models';

export const DefaultProductFilter: ProductListingFilter = {
  page: 1,
  perPage: 500,
  price_min: 0,
  price_max: 300,
  language: 'english',
  search_key: '',
  brandName: [],
  category: '',
  attributes: [],
  subcategory1: '',
  subcategory2: '',
  subcategory3: '',
  subcategory4: '',
  subcategory5: '',
  countryOrigin: [],
  minimum_price: true,
  minimum_distance: false,
  best_offers: false,
  longitude: null,
  latitude: null,
  sort: '',
  shop_by: '',
  searchKey: '',
};

export const DefaultPriceRange: PriceRangeSlider = {
  floor: 0,
  ceil: 3000
};
