"use client";

import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function AddToCardButton({
  id,
  price,
  title,
}: {
  id: string;
  price: number;
  title: string;
}) {
  const [quantity, setQuantity] = React.useState("");
  React.useEffect(() => {
    // Retrieve the cart from localStorage
    const currentCart = localStorage.getItem("cart");
    const cart = currentCart ? JSON.parse(currentCart) : [];

    // Find the product in the cart by id
    const product = cart.find((item: any) => item.id === id);

    if (product) {
      // If the product is found, set its quantity to state
      setQuantity(product.quantityNumber);
    }
  }, [id]);
  const addToCart = () => {
    const quantityNumber = parseInt(quantity);

    // Retrieve the current cart from localStorage
    const currentCart = localStorage.getItem("cart");
    let cart = currentCart ? JSON.parse(currentCart) : [];

    // Check if the product with the given id already exists in the cart
    const productIndex = cart.findIndex((item: any) => item.id === id);

    if (productIndex !== -1) {
      // If the product exists, set its quantityNumber to the new value
      cart[productIndex].quantityNumber = quantityNumber;
    } else {
      // If the product doesn't exist, add a new object to the cart
      cart.push({
        id,
        price,
        title,
        quantityNumber,
      });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="number"
        label="Kuantitas"
        placeholder="0"
        labelPlacement="outside"
        value={quantity}
        onValueChange={setQuantity}
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">PCS</span>
          </div>
        }
      />
      <Button color="primary" fullWidth onClick={() => addToCart()}>
        Tambah ke Keranjang
      </Button>
    </div>
  );
}
