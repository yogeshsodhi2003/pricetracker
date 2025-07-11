"use server";
import { sendmailtest } from "../action/sendmail";
import { connectToDB } from "../db/db";
import Product from "@/models/product.model";

export async function pricechecker() {
  await connectToDB();
  const products = await Product.find({});
  for (const product of products) {
    if (product.currentPrice <= product.targetPrice) {
     await sendmailtest(product)
    }
  }
}
