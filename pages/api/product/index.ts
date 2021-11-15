import {NextApiRequest} from 'next'
import dbConnect from '../../../utils/dbConnect'
import Products, {IProductDoc} from '../../../models/products'
import Images, {IImageDoc} from '../../../models/images'
import { ApiResponse, ISuccessResponse } from '../../../endpoints/endpoints'
import Stripe from 'stripe'

export default async function handler(req: NextApiRequest, res: ApiResponse<ISuccessResponse>): Promise<void> {
    if(req.method === "POST"){
        try{
            await dbConnect()
            const {  name, unitAmount, image, description, category }: IProductDoc = req.body

            const imageDoc: IImageDoc = await new Images(image)
            const imageUrl = `http://localhost:3000/api/product/image/${imageDoc.id}`

            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: "2020-08-27"
              })

            const stripeProduct: Stripe.Product = await stripe.products.create({
                name,
                description,
                images: [imageUrl]
            })

            const stripePrice: Stripe.Price = await stripe.prices.create({
                currency: "usd",
                product: stripeProduct.id,
                unit_amount: unitAmount * 100
            })

            const product: IProductDoc = await new Products({
                productId: stripeProduct.id,
                image: imageDoc._id,
                name,
                description,
                priceId: stripePrice.id,
                unitAmount: unitAmount * 100,
                currency: "usd",
                category
            })

            await product.save()
            await imageDoc.save()

            res.status(201).json({success: true, message: "Product Added Successfully"})
        } catch(err){
            res.status(400).send(err)
        }
    }
}