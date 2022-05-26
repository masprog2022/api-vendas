import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductsRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProducts {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProducts[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }
    const existsProductsIds = existsProducts.map((product) => product.id);
    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );
     if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
  }
}

export default CreateOrderService;
