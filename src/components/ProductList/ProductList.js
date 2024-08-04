import React from "react";
import ProductListCard from "../ProductListCard/ProductListCard";
import { useProducts } from "@/context/ProductsContext";

export default function ProductList() {
  const { products } = useProducts();
  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductListCard key={product.id} {...product} />
      ))}
    </div>
  );
}
