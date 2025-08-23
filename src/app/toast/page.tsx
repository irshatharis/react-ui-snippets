
"use client"

import Image from "next/image";
import {useToast} from "@/components/toast";

let postId = 0;

export default function Page() {
  const {addToast} = useToast();

  return (
  <main className="max-w-2xl mx-auto p-8">
    <div className="flex flex-col items-center">
    <h1 className="text-2xl font-semibold mb-4">React toast implementation
    </h1>
    <button 
        onClick={() => {
          addToast({message: `Post #${++postId} created successfully!`});
        }} 
        className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 text-white font-medium text-base transition-all w-fit">
        Add toast
    </button>
    </div>
  </main>
  );
}
