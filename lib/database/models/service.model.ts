import { Document } from 'mongodb';
import { Schema,models, model} from 'mongoose';

export interface IService extends Document {
    _id: string;
    serviceTitle: string;
    description?: string;
    location: string;
    imageUrl?: string;
    category: {_id: string, categoryName: string};
    createdBy: {_id: string, firstName: string, lastName: string, phoneNumber: string};
    price: number;
    isAvailable: boolean;
    createdAt: Date;
    url?: string;
}
const ServiceSchema = new Schema({
    serviceTitle: { type: String, required: true},
    description: { type: String},
    location: { type: String, required: true },
    imageUrl: { type: String},
    category :{type: Schema.Types.ObjectId, ref: 'Category'},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: String, required: true },
    isAvailable: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    url: { type: String },
});

//creating a new model
//const Service = models.Service || model<IService>('Service', ServiceSchema);
const Service = models.Service || model('Service', ServiceSchema);

export default Service;