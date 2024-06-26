import { Schema, models, model, Document} from "mongoose";
//type
export interface ICategory extends Document {
    _id: string;
    categoryName: string; 
}
const CategorySchema = new Schema({ //just as to be the category of the service like carpenting, plumbing, etc.
    categoryName: { type: String, required: true, unique: true },
});

const Category = models.Category || model('Category', CategorySchema);
export default Category;