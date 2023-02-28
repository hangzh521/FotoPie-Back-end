import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema"
import {Image, ImageSchema} from "./image.schema"

export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {

_id: mongoose.Schema.Types.ObjectId;
    
@Prop()
filename: string;  
    
@Prop()
path: string;   
    
@Prop()
tag: string;
        
@Prop()
price: GLfloat
        
    
@Prop()
userEmail: string;
}

export const PostSchema = SchemaFactory.createForClass(Posts);