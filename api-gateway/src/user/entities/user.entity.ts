import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Role from './role.enum';
import { IsEmail } from 'class-validator';
import { Order } from '../../order/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Customer
  })
  public role: Role


}
