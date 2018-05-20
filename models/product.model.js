import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required!'],
            minlength: [3, 'Name must be longer!'],
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'Description are required!'],
            minlength: [3, 'Description must be longer!'],
        },
        price: {
            type: Number,
            min: [1000, 'Product price should greater than 1000']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
    },
    {
        timestamps: true
    }
);

ProductSchema.methods = {
    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            description: this.description,
            price: this.price,
            category: this.category,
            created: this.createdAt,
            modified: this.updatedAt
        }
    }
}

ProductSchema.statics = {
    /**
     * Create a product
     */
    createProduct(args, categoryId) {
        return this.create({
            ...args,
            category: categoryId
        })
    },

    /**
     * Get List Products
     */
    getLists(skip = 0, limit = 30) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('category');
    }
}

let Product;

try {
    Product = mongoose.model('Product');
} catch (e) {
    Product = mongoose.model('Product', ProductSchema);
}

export default Product;