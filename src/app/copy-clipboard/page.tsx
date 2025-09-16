"use client";
import {useCopyToClipboard} from "@/hooks/use-copy-to-clipboard";

export default function CopyClipboard() {
  const {isCopied, copyToClipboard} = useCopyToClipboard();

  return (
    <div className="">
      <button onClick={() => copyToClipboard("69420")}>
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
