import mongoose, {Document, Schema, model, Model, models} from 'mongoose'

export interface IImageDoc extends Document{
    name: string,
    type: string,
    file: string,
    size: number
}

const ImageSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Images: Model<IImageDoc> = mongoose.models.Images || mongoose.model("Images", ImageSchema)

export default Images