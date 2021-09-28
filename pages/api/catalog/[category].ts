import {NextApiRequest} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Products, {IProductDoc} from '../../../models/products'
import { CategoryQuery } from '../../../types'
import {ApiResponse} from '../../../endpoints/endpoints'

interface ICategoryQuery {
  category?: CategoryQuery
}

export default async function handler(req: NextApiRequest, res: ApiResponse<IProductDoc[]>): Promise<void> {
  if(req.method === "GET"){
    try{
      await dbConnect()

      const { category }: ICategoryQuery  = req.query

      Products.find({category: category}).populate('image').exec((err: Error, products: IProductDoc[]) => {
        if(err){
          res.status(400).json({error: "Something went wrong"})
        } else{
          res.status(200).send(products)
        }
      })
    } catch(err){
      res.status(400).json({error: "Something went wrong"})
    }
  }
}
