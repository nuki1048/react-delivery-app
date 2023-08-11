import { CartItem } from '../../global/interfaces';

export interface CartItemProps extends CartItem {
  id: string;
  name: string;
  price: number;
  amount: number;
}
