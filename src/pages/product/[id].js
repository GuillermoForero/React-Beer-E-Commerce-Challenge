import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails";
import { fetchProducts } from "@/services/productsService";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export async function getStaticPaths() {
  const products = await fetchProducts();

  const paths = products.map((product) => ({
    params: {
      id: `${product.id}-${product.brand.toLowerCase().replace(" ", "-")}`,
    },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps() {
  let productsList = [];
  const data = await fetchProducts();
  productsList = data;
  return { props: { productsList } };
}

export default Product;
