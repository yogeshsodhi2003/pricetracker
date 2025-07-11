"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { createTrackr } from "@/lib/action/productTrackr";
import { X, CheckCircle2 } from "lucide-react";

export default function ProductPage() {
  const [targetPrice, setTargetPrice] = useState<number>();
  const [isopen, setIsopen] = useState(false);
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");
  console.log("this is raw data", rawData)
  const product = rawData ? JSON.parse(decodeURIComponent(rawData)) : null;
  console.log(product)

  const handleTrackr = () => {
    try {
      createTrackr({
        title: product.title,
        url: product.url,
        targetPrice: targetPrice,
        image: product.image,
        currentPrice: product.price,
      });
      setIsopen(true);
    } catch {
      throw new Error("error while creating trackr");
    }
  };

  return (
    <>
      <motion.div
        className="max-w-3xl mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-xl shadow-md object-contain"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg font-medium text-[#ff2969]">
              ₹{product.price}
            </p>

            <div className="mt-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Set Target Price
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                placeholder="Enter your price..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff2969]"
              />
              <button
                onClick={handleTrackr}
                className="mt-2 w-full bg-[#ff2969] text-white py-2 rounded-md hover:bg-pink-600 transition"
              >
                Set Price Alert 🚨
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* modal for the successfully creted */}
      {isopen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center"
          >
            <button
              onClick={() => setIsopen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            >
              <X size={20} />
            </button>

            {/* ✅ Icon + Message */}
            <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto mb-3" />
            <h2 className="text-xl font-semibold">Success!</h2>
            <p className="text-gray-600">Price tracker created successfully</p>
          </motion.div>
        </div>
      )}
    </>
  );
}
