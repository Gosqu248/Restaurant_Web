import {CartItem} from './cart-item';
import {UserDTO} from './user';

export interface Order {
  status: OrderStatus;
  totalPrice: number;
  deliveryTime: string;
  comment: string;
  paymentId: string | null;
  paymentMethod: string;
  orderMenus: CartItem[];
  user: UserDTO;
}

export enum OrderStatus {
  niezapłacone = 'niezapłacone',
  zapłacone = 'zapłacone',
}
