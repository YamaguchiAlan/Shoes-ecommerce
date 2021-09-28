import {Document, Schema, model, Model, models, Types} from 'mongoose'
import {IImageDoc} from './images'

export interface IProductDoc extends Document{
    image?: Types.ObjectId | IImageDoc,
    name: string,
    price: number,
    discount?: number,
    category: string
}

const ProductSchema: Schema = new Schema({
    image: {
        type: Schema.Types.ObjectId,
        ref: "Images",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
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