"use client";
import { Skeleton, Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-full h-full grid place-items-center">
      <Spinner size="md" />
    </div>
  );
}

export function CardLoading() {
  return <Skeleton />;
}
