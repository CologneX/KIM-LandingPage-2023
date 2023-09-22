import type { Metadata, ResolvingMetadata } from "next";
import ImageCarousel from "./ImageCarousel";
import { toRupiah } from "@/app/utils/numbers";
import { Button } from "@nextui-org/react";
import AddToCardButton from "./AddToCartButton";
type Props = {
  params: { id: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`https://dummyjson.com/products/${id}`).then(
    (res) => res.json()
  );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.thumbnail, ...previousImages],
    },
  };
}

const getProductDetail = async ({ id }: { id: string }) => {
  try {
    const res = await fetch(`https://dummyjson.com/product/${id}`, {
      cache: "force-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Gagal dalam mengambil data produk");
  }
};

export default async function Page({ params }: Props) {
  let productDetail = await getProductDetail(params);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <ImageCarousel {...productDetail} />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-bold">{productDetail.title}</h1>
          <p className="text-md">{productDetail.description}</p>
        </div>
        <AddToCardButton {...productDetail} />
      </div>
    </div>
  );
}
