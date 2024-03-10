export interface ICabin {
  id: number;
  created_at: string;
  description: string;
  discount: string;
  id: number;
  image: string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
}

export interface ICabinPayload {
  description: string;
  discount: string;
  image: FileList | string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
}

export interface ICabinFormData {
  description: string;
  discount: string;
  image: FileList | string;
  maxCapacity: string;
  name: string;
  regularPrice: string;
}

export interface ISettings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface ISettingsPayload {
  minBookingLength?: number;
  maxBookingLength?: number;
  maxGuestsPerBooking?: number;
  breakfastPrice?: number;
}

export type CabinDiscountTypes = 'all' | 'no-discount' | 'with-discount';

export interface IBooking {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins: ICabin;
  guests: Guest;
}

export interface Guest {
  id: number;
  email: string;
  fullName: string;
  created_at: Date;
  nationalID: string;
  countryFlag: string;
  nationality: string;
}

export interface IBookingPayload {
  status: 'checked-in' | 'checked-out';
  isPaid?: boolean;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignupPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface IUserUpdatePayload {
  password?: string;
  fullName?: string;
  avatar?: File;
}

export interface IBookingStatistics {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

export interface IStaysStatistics extends IBookingStatistics {
  status: 'unconfirmed' | 'checked-out' | 'checked-in';
  numNights: number;
  guests: Omit<
    Guest,
    'id' | 'email' | 'created_at' | 'nationalID' | 'countryFlag' | 'nationality'
  >;
}

export interface ITodayActivity extends IBookingStatistics {
  id: number;
  status: 'unconfirmed' | 'checked-out' | 'checked-in';
  numNights: number;
  guests: Omit<Guest, 'id' | 'email' | 'created_at' | 'nationalID'>;
}
