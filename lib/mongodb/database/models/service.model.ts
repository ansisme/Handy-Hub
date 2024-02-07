import { Document } from 'mongodb';
import { Schema } from 'mongoose';
export interface IService extends Document {
    _id: string;
    serviceTitle: string;
    description?: string;
    location: string;
    imageUrl?: string;
    category: string;
    createdBy: string;
    price: number;
    createdAt: Date;
    url?: string;
}
const ServiceSchema = new Schema({
    serviceTitle: { type: String, required: true, unique: true },
    description: { type: String},
    location: { type: String, required: true },
    imageUrl: { type: String},
    category :{type: Schema.Types.ObjectId, ref: 'Category'},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    url: { type: String },
});