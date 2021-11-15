import {Document, Schema, model, Model, models, Types} from 'mongoose'
import {IImageDoc} from './images'

export interface IProductDoc extends Document{
    productId: string,
    image?: Types.ObjectId | IImageDoc,
    name: string,
    description: string,
    priceId: string,
    unitAmount: number,
    currency: string,
    category: string
}

const ProductSchema: Schema = new Schema({
    productId: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Images",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priceId: {
        type: String,
        required: true
    },
    unitAmount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Products: Model<IProductDoc> = models.Products || model("Products", ProductSchema)

export default Products