import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minlength: [3, 'Name must be longer!'],
            unique: true,
        },
        description: {
            type: String,
            minlength: [3, 'Description must be longer'],
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },
    {
        timestamps: true
    }
)

let Category;

try {
    Category = mongoose.model('Category');
} catch (e) {
    Category = mongoose.model('Category', CategorySchema);
}

export default Category;