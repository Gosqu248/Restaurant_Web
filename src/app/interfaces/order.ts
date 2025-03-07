export interface Order {
  status: OrderStatus;
  totalPrice: number;
  deliveryTime: string;
  comment: string;
  paymentId: string | null;
  paymentMethod: string;
  orderMenus: OrderMenu[];
  userId: number;
}

export enum OrderStatus {
  niezapłacone = 'niezapłacone',
  zapłacone = 'zapłacone',
}

export interface OrderMenu {
  menuId: number;
  quantity: number;
}

export interface OrderResponse {
  message: string;
  orderId: string;
}

export interface OrderDTO {
  id: number;
  deliveryTime: string;
  orderMenus: OrderMenu[];
  paymentId: string | null;
  paymentMethod: string;
  comment: string;
  status: OrderStatus;
  totalPrice: number;
  orderDate: string;
}

export interface AdminOrderDTO {
  id: number;
  status: OrderStatus;
  orderDate: string;
  deliveryTime: string;
  paymentMethod: string;
  paymentId: string;
  comment: string;
  totalPrice: number;
  orderMenus: OrderMenu[];
  userName: string;
  userEmail: string;
  userPhone: string;
}
