import { MenuItem } from '../../global/interfaces';

export interface MenuItemProps extends MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
  id: string;
}
