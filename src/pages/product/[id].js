import { useRouter } from "next/router";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();

  const paths = products.map((product) => ({
    params: {
      id: `${product.id}-${product.brand.toLowerCase().replace(" ", "-")}`,
    },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps() {
  let productsList = [];
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    productsList = data;
  } catch (error) {
    console.error(error);
  }
  return { props: { productsList } };
}
