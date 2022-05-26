import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import OrdersProducts from "./OrdersProducts";
import Customer from "@modules/customers/typeorm/entities/Customer";

@Entity("orders")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true, // Aqui assim que foi feito save, todas a OrdersProducts vao ser salvos no banco de dados
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Order;
