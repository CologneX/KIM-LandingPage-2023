"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import NextImage from "next/image";
import NextLink from "next/link";
export default function ProductCards({ ...data }) {
  return (
    <Card
      className="max-w-sm grow"
      isPressable
      disableRipple
      as={NextLink}
      href={`/produk/${data.id}`}
    >
      <CardBody key={data.id}>
        <Image
          src={data.thumbnail}
          alt={data.title}
          width={500}
          height={500}
          style={{ objectFit: "cover", aspectRatio: "1/1" }}
          as={NextImage}
        />
        <div className="h-4"></div>
        <div className="flex flex-col items-start justify-start gap-y-2 ">
          <h2 className="text-md font-bold line-clamp-2">{data.title}</h2>
          <p className="text-sm line-clamp-3">{data.description}</p>
        </div>
      </CardBody>
    </Card>
  );
}
