import { User } from 'src/shared/interfaces/user/user.interface';

export interface ProductOrder<ProductType = string> {
  product: ProductType;
  quantity: number;
}

export interface Order extends Document {
  owner: User['_id'];
  products: ProductOrder[];
  totalPrice: number;
  created: Date;
}
