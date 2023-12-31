import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SearchBarModalProps = {
  products: Product[] | undefined;
  search: string;
};

const SearchBarModal = ({ products, search }: SearchBarModalProps) => {
  return (
    <div
      className="absolute left-0 top-10 h-fit w-full  rounded-b-lg bg-neutral-200 dark:bg-neutral-700"
      onClick={(e) => e.stopPropagation()}
    >
      {products?.map((product, indx) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div
            className={`flex h-fit  w-full items-start justify-start gap-4 p-4 hover:bg-neutral-300 dark:hover:bg-neutral-600 ${
              indx + 1 === products.length
                ? ""
                : "border-b-2 border-neutral-800"
            }`}
          >
            <div className="h-20 w-20 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={`${product.name}`}
                height={100}
                width={100}
                priority
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="w-fit break-all border-b-[1px] border-neutral-400 text-sm font-light text-neutral-700 dark:text-neutral-400">
                Brand name
              </p>
              <p className="break-all">{product.name}</p>
              <p className="text-lg">{product.price}:-</p>
            </div>
          </div>
        </Link>
      ))}
      {products && search !== "" && products.length !== 0 && (
        <Link href={`/search/${search}`}>
          <p className=" w-full cursor-pointer rounded-b-lg py-2 text-center text-sm text-neutral-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-neutral-600">
            See more results
          </p>
        </Link>
      )}
    </div>
  );
};

export default SearchBarModal;
