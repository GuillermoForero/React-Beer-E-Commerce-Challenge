import { useProducts } from "@/context/ProductsContext";

import ProductListCard from "../ProductListCard";

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
