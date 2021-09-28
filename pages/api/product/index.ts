import {NextApiRequest} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Products, {IProductDoc} from '../../../models/products'
import Images, {IImageDoc} from '../../../models/images'
import { ApiResponse, ISuccessResponse } from '../../../endpoints/endpoints'

export default async function handler(req: NextApiRequest, res: ApiResponse<ISuccessResponse>): Promise<void> {
    if(req.method === "POST"){
        try{
            await dbConnect()
            const {  name, price, image, discount, category }: IProductDoc = req.body

            const imageDoc: IImageDoc = await new Images(image)

            const product: IProductDoc = await new Products({
                name,
                price,
                discount,
                category,
                image: imageDoc._id
            })

            await imageDoc.save()
            await product.save()

            res.status(201).json({success: true, message: "Product Added Successfully"})
        } catch(err){
            res.status(400).send(err)
        }
    }
}