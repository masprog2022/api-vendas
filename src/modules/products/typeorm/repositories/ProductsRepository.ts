import { Repository } from "typeorm";

import Product from "../entities/Product";

export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
}
