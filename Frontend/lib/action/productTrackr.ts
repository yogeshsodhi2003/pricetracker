"use server";
import Product from "@/models/product.model";
import { connectToDB } from "../db/db";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/auth"

export async function createTrackr(productData: {
  title: string;
  image: string;
  url: string;
  currentPrice: number;
  targetPrice: number | undefined;
}) {
  const session = await getServerSession(authOptions)
  await connectToDB();
  const product = new Product({
    ...productData,
     email: session?.user.email,
  });
  await product.save();
}
