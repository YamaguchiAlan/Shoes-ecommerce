import {NextApiRequest} from 'next'
import dbConnect from '../../../../utils/dbConnect'
import Images, {IImageDoc} from '../../../../models/images'
import { ApiResponse } from '../../../../endpoints/endpoints'
import {Types} from 'mongoose'

interface idQuery {
    id?: Types.ObjectId
}

export default async function handler(req: NextApiRequest, res: ApiResponse<Buffer>): Promise<void> {
    if(req.method === "GET"){
        try{
            await dbConnect()
            const {id}: idQuery = req.query

            const image: IImageDoc = await Images.findById(id)

            const buffer = Buffer.from(image.file.replace(`data:image/${image.type};base64,`, ""), "base64")

            res.setHeader("content-type", `image/${image.file}`)
            res.status(201).send(buffer)
        } catch(err){
            res.status(400).send(err)
        }
    }
}