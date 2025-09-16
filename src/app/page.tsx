"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/toast";

let postId = 0;

export default function Home() {
  const { addToast } = useToast();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Re-creating UI elements to practice React
        </h1>

        <ul className="grid grid-cols-3 justify-center w-full gap-4 my-8">
          <li>
            <ItemLink href="/toast">Toast</ItemLink>
          </li>

          <li>
            <ItemLink href="/copy-clipboard">Copy to clipboard</ItemLink>
          </li>
        </ul>
      </div>
    </main>
  );
}

function ItemLink(props: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className="border border-gray-300 p-6 rounded-md hover:bg-gray-50 min-w-40 min-h-24 flex justify-center items-center text-xl font-medium"
      {...props}
    />
  );
}
