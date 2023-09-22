"use client";
import { Button } from "@nextui-org/react";


export default function Error({
  reset,
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
      <h2 className="text-3xl text-red-400 font-bold">{error.message}</h2>
      <Button onClick={() => reset()} color="default" size="lg">
        Coba lagi
      </Button>
    </div>
  );
}
