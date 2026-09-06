export type BookingItemType = "TEST" | "PACKAGE";

export interface BookingItem {
  id: string;
  type: BookingItemType;
  name: string;
  price: number;
  mrp: number;
  quantity: number;
}

export type Gender =
  | "MALE"
  | "FEMALE"
  | "OTHER"
  | "";

export type CollectionType =
  | "HOME_COLLECTION"
  | "CENTRE_VISIT";

export interface BookingPatient {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface BookingAddress {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

export interface BookingSchedule {
  collectionDate: string;
  timeSlot: string;
}

export interface BookingFormState {
  patient: BookingPatient;

  collectionType: CollectionType;

  centreId: string;
  centreName: string;

  address: BookingAddress;

  schedule: BookingSchedule;
}

export interface Booking {
  id: string;
  bookingId: string;

  items: BookingItem[];

  patient: BookingPatient;

  collectionType: CollectionType;

  centreId?: string;
  centreName?: string;

  address?: BookingAddress;

  schedule: BookingSchedule;

  subtotal: number;
  totalMrp: number;
  discount: number;
  total: number;

  status:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED";

  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED";

  createdAt: string;
}