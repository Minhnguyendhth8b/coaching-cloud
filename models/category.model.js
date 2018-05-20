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

CategorySchema.methods = {
    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            description: this.description,
            products: this.products,
            created: this.createdAt,
            modified: this.updatedAt
        }
    }
}

CategorySchema.statics = {
    /**
     * Create a category
     */
    createCategory(args) {
        return this.create({
            ...args
        })
    },

    /**
     * Get List Categories
     */
    getLists(skip = 0, limit = 30) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('product');
    }
}

let Category;

try {
    Category = mongoose.model('Category');
} catch (e) {
    Category = mongoose.model('Category', CategorySchema);
}

export default Category;