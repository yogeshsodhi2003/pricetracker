"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { scrapeProduct } from "@/lib/action/productScraper";
import { useRouter } from "next/navigation";

const products = [
  {
    name: "iPhone 15",
    src: "https://images.unsplash.com/photo-1688649593308-40dfbb552d00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aSUyMHBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Sony Headphones",
    src: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29ueSUyMGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Apple Watch",
    src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "MacBook Air",
    src: "https://images.unsplash.com/photo-1620365602462-40d8f2cdd84c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hYyUyMGJvb2t8ZW58MHx8MHx8fDA%3D",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function getDomainType(url: string): "flipkart" | "test" | "other" {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();
      if (hostname.includes("flipkart.")) return "flipkart";
      if (hostname.includes("webscraper.io")) return "test";
      return "other";
    } catch {
      alert("Please enter a valid URL");
      return "other";
    }
  }

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const domian = getDomainType(search);
    if (domian == "other") {
      alert("Please enter a valid URL");
    }
    try {
      setLoading(true);
      const data = await scrapeProduct(search, domian);
      const encoded = encodeURIComponent(JSON.stringify(data));
      router.push(`/product/product?data=${encoded}`);
    } catch {
      alert("Please enter a valid URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-16 flex flex-col items-center text-center">
      {/* Heading */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-black mb-4"
      >
        Track Prices. Save Smarter.
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-gray-600 max-w-xl mb-10"
      >
        Get real-time updates and price drop alerts on your favorite products
        from across the web. Just search, sit back, and let the savings come to
        you.
      </motion.p>

      {/* Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex w-full max-w-lg border border-gray-300 rounded-full px-4 py-2 shadow-sm items-center mb-16"
      >
        <Search className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          value={search}
          placeholder="Search for a product..."
          className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-900 transition"
        >
          {loading ? "searching" : "Search"}
        </button>
      </motion.form>

      {/* Product Images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <Image
              src={product.src}
              alt={product.name}
              width={200}
              height={200}
              className="w-full object-cover"
            />
            <div className="p-2 text-sm font-medium text-gray-800">
              {product.name}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
