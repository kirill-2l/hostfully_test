export interface Booking {
  id: string;
  propertyName: string;
  propertyId: string;
  startDate: number;
  endDate: number;
  guestsCount: number;
}

export interface BookingSchema {
  data: Booking[];
}
