"use client";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import { CartLogo, TrashLogo } from "./icons";
import React from "react";
import { toRupiah } from "../utils/numbers";
export default function CartPopover() {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    // Retrieve the cart from localStorage
    const currentCart = localStorage.getItem("cart");
    const parsedCart = currentCart ? JSON.parse(currentCart) : [];

    // Update the state variable with the cart data
    setCart(parsedCart);
  }, []);

  // Function to update the cart in localStorage and state
  const updateCart = (newCart: any) => {
    // Update the state variable
    setCart(newCart);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Example function to remove a product
  const removeFromCart = (id: string) => {
    // Filter out the product to remove from the cart
    const updatedCart = cart.filter((item: any) => item.id !== id);

    // Update the cart in localStorage and state
    updateCart(updatedCart);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", () => {
      const currentCart = localStorage.getItem("cart");
      const parsedCart = currentCart ? JSON.parse(currentCart) : [];
      setCart(parsedCart);
    });
  }
  function generateWhatsAppLink(message: string) {
    const encodedMessage = encodeURIComponent(message);
    const encodedPhoneNumber = encodeURIComponent("+6281335317361");

    // Construct the WhatsApp link
    const whatsappLink = `https://wa.me/${encodedPhoneNumber}?text=${encodedMessage}`;

    return whatsappLink;
  }

  const handleCheckout = () => {
    const cartItems = cart.map((item: any) => {
      return `${item.quantityNumber}x ${item.title} @Rp${item.price} = Rp${
        item.price * item.quantityNumber
      }`;
    });
    const message = `🤚 Halo, Saya ingin membeli produk kerajinan Bapak dengan rincian seperti berikut ini:\n${cartItems.join(
      "\n"
    )}`;

    const whatsappLink = generateWhatsAppLink(message);
    // goto the link given by whatsappLink in a new tab using router
    if (typeof window !== "undefined") {
      window.open(whatsappLink, "_blank");
      updateCart([]);
    }
    // reset the cart
  };
  return (
    <>
      <Badge
        color="primary"
        content={cart.length}
        isInvisible={cart.length === 0}
        shape="circle"
      >
        <Button variant="light" size="sm" isIconOnly onClick={onOpen}>
          <CartLogo />
        </Button>
      </Badge>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cart</ModalHeader>
              <ModalBody>
                {cart &&
                  cart.map((item: any) => {
                    return (
                      <Card key={item.id} className="border border-default-300">
                        <CardBody>
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className=" text-lg font-semibold">
                                {item.title}
                              </h3>
                              <Chip
                                color="primary"
                                variant="bordered"
                                radius="sm"
                              >
                                <p className="text-sm">
                                  {toRupiah(item.price)} x {item.quantityNumber}{" "}
                                  PCS
                                </p>
                              </Chip>
                            </div>
                            <Divider orientation="vertical" className="h-8" />
                            <h4 className=" text-md font-semibold">
                              {toRupiah(item.price * item.quantityNumber)}
                            </h4>
                          </div>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex gap-x-4">
                          <Button
                            color="danger"
                            size="sm"
                            variant="light"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <TrashLogo color="text-error-700" /> Hapus
                          </Button>
                          <Divider orientation="vertical" className="h-8" />
                          <Input
                            type="number"
                            label="Kuantitas"
                            labelPlacement="inside"
                            className="w-32 grow"
                            value={item.quantityNumber}
                            onValueChange={(e) => {
                              const updatedCart = cart.map((cartItem: any) => {
                                if (cartItem.id === item.id) {
                                  return {
                                    ...cartItem,
                                    quantityNumber: e,
                                  };
                                }
                                return cartItem;
                              });
                              updateCart(updatedCart);
                            }}
                            size="sm"
                            endContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  PCS
                                </span>
                              </div>
                            }
                          />
                        </CardFooter>
                      </Card>
                    );
                  })}
                {cart.length === 0 && (
                  <>
                    <p className="text-center text-lg font-bold">
                      Keranjang anda kosong
                    </p>
                    <p className="text-center text-sm font-semibold">
                      Pilih barang dulu yuk!
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button
                  color="primary"
                  onPress={handleCheckout}
                  fullWidth
                  isDisabled={cart.length === 0}
                >
                  Checkout / Hubungi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
