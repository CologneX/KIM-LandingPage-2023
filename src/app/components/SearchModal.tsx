"use client";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Spinner,
  useDisclosure,
  Image,
  Card,
  CardBody,
} from "@nextui-org/react";
import NextImage from "next/image";
import { SearchIcon } from "./icons";
import { useEffect, useState } from "react";
import { toRupiah } from "../utils/numbers";
import { useRouter } from "next/navigation";

const cariProduk = async (search: string) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  const data = await res.json();
  return data;
};

export default function SearchModal() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (search) {
      setLoading(true);
      cariProduk(search).then((res) => {
        setLoading(false);
        setData(res.products);
      });
    }
  }, [search]);

  return (
    <>
      <Button onPress={onOpen} startContent={<SearchIcon />} fullWidth>
        Cari Produk...
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className="h-96"
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="p-0">
                <Input
                  aria-label="Search"
                  size="lg"
                  radius="none"
                  value={search}
                  onValueChange={setSearch}
                  classNames={{
                    inputWrapper:
                      "bg-transparent shadow-lg dark:bg-transparent",
                    input: "text-lg",
                  }}
                  placeholder="Cari Produk..."
                  startContent={<SearchIcon />}
                />
              </ModalHeader>
              <Divider />
              {loading && (
                <Progress
                  size="sm"
                  radius="none"
                  isIndeterminate
                  aria-label="Loading..."
                />
              )}
              <ModalBody className="overflow-y-auto">
                {data.length < 1 && !search && (
                  <p className="text-lg font-semibold flex items-center justify-center h-full">
                    Silahkan cari produk yang anda inginkan
                  </p>
                )}
                {loading && (
                  <div className="flex items-center justify-center h-full">
                    <Spinner size="lg" />
                  </div>
                )}
                {data.length < 1 && search && !loading && (
                  <p className="text-lg font-semibold flex items-center justify-center h-full">
                    Produk tidak ditemukan
                  </p>
                )}
                {data.length > 0 && !loading && (
                  <div className="flex flex-col gap-y-2">
                    {data.map((item: any) => {
                      return (
                        <Card
                          isPressable
                          disableRipple
                          key={item.id}
                          onClick={() => {
                            router.push(`/produk/${item.id}`);
                            onClose();
                          }}
                        >
                          <CardBody className="flex flex-row gap-x-4 items-center">
                            <Image
                              as={NextImage}
                              src={item.thumbnail}
                              alt={item.title}
                              width={100}
                              height={100}
                              className="aspect-square object-cover w-96"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-lg font-bold">
                                {item.title}
                              </h3>
                              <p className="text-xs grow-0">
                                {item.description}
                              </p>
                              {/* <p className="text-base font-semibold">
                                {toRupiah(item.price)}
                              </p> */}
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
