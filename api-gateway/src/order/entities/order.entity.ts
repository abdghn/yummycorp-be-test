import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_products',
    joinColumn: { name: 'orderId', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id'},
  })
  products: Product[];


}


