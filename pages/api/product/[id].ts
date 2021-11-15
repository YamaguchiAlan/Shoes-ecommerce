import {NextApiRequest} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Products, {IProductDoc} from '../../../models/products'
import { ApiResponse } from '../../../endpoints/endpoints'
import {Types} from 'mongoose'

interface idQuery {
    id?: Types.ObjectId
}

export default async function handler(req: NextApiRequest, res: ApiResponse<IProductDoc>): Promise<void> {
    if(req.method === "GET"){
        try{
            await dbConnect()
            const {id}: idQuery = req.query

            const product: IProductDoc = await Products.findById(id)

            res.status(201).json(product)
        } catch(err){
            res.status(400).send(err)
        }
    }
}