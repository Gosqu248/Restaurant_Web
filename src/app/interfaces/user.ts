import {UserAddress} from './user.address.interface';

export interface User {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  addresses?: UserAddress;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

