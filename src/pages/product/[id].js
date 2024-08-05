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
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  let productsList = [];
  try {
    const data = await fetchProducts();
    productsList = data;
  } catch (error) {
    console.error(error);
  }
  return { props: { productsList }, revalidate: 1 };
}

export default Product;
