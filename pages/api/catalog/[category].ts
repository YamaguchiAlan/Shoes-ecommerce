import {NextApiRequest} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Products, {IProductDoc} from '../../../models/products'
import { CategoryQuery } from '../../../types'
import {ApiResponse} from '../../../endpoints/endpoints'
import Stripe from 'stripe'

interface ICategoryQuery {
  category?: CategoryQuery
}

export default async function handler(req: NextApiRequest, res: ApiResponse<IProductDoc[]>): Promise<void> {
  if(req.method === "GET"){
    try{
      await dbConnect()

      const { category }: ICategoryQuery  = req.query

      const products: IProductDoc[] = await Products.find({category: category})

      res.status(200).send(products)
    } catch(err){
      res.status(400).json({error: "Something went wrong"})
    }
  }
}
