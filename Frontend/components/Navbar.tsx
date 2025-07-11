
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { pricechecker } from "@/lib/priceChecker/priceChecker";

import { Search, User } from "lucide-react";

export default function Navbar() {




 const handletest = () =>{
  pricechecker()
 }
  










  const { data: session } = useSession();

  const avatar = session?.user.image;

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
      <div className="text-xl font-bold tracking-tight text-black">
        PriceTrackr
      </div>
      </Link>
      <button onClick={handletest}>testpricechecker</button>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="text-gray-600 hover:text-black transition">
          <Search size={20} />
        </button>

        {/* User Icon */}
        <button className="text-gray-600 hover:text-black transition">
          <User size={20} />
        </button>
        <div>
          {session?.user ? (
            <Image
              src={`${avatar}`}
              width={30}
              height={30}
              alt="profile"
              className="rounded-full cursor-pointer"
              onClick={() => signOut()}
            />
          ) : (
            <Button onClick={() => signIn()}>sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
