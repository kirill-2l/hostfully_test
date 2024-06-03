export interface IProperty {
  id: string;
  name: string;
  price: number;
  bedsCount: number;
  bathsCount: number;
  reviewsCount: number;
  ratingScore: number;
  currency: string;
  imgUrl?: string;
}

export enum ValidateBookingError {
  NO_DATA = 'NO_DATA',
  OVERLAPPING_BOOKING = 'OVERLAPPING_BOOKING',
}
