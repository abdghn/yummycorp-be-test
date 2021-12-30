import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from './role.enum';
import { compare, genSalt, hash } from 'bcrypt';
import { Order } from './order.entity';
import { IsEmail } from 'class-validator';

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

  @BeforeInsert()
  public async hashPassword() {
    const salt = await genSalt();
    this.password = await hash( this.password, salt);
  }

}
