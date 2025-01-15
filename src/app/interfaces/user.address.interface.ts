export interface UserAddress {
  id: number;
  street: string;
  houseNumber: string;
  city: string;
  zipCode: string;
  floorNumber?: string;
  accessCode?: string;
}
