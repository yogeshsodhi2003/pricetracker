import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  image: string;
  url: string;
  source: string;
  currentPrice: number;
  targetPrice: number;
  email: string; // email of user who set tracker
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    targetPrice: { type: Number, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev
const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
