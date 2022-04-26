import { Request, Response } from "express";

import ListProductService from "../services/ListProductService";

export default class ProductController {
  public async index(request: Request, response: Response) {
    const listProduct = new ListProductService();
    const product = listProduct.execute();

    return response.json(product);
  }
}
