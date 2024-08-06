import MenuIcon from "@/icons/menuIcon";
import { fetchProducts } from "@/services/productsService";

import ProductList from "../components/ProductList";

const namespace = "products";
const ProductsPage = () => {
  const userImage =
    "https://beer-challenge-ecommerce-bucket.s3.amazonaws.com/images/mark.jpeg";
  return (
    <div className={`${namespace}__container`}>
      <div className={`${namespace}__icons-container`}>
        <MenuIcon />
        <img className={`${namespace}__user-icon`} src={userImage} />
      </div>
      <div className={`${namespace}__text-container`}>
        <p>Hi Mr. Michael,</p>
        <h1>Welcome Back!</h1>
        <h2>Our products</h2>
      </div>
      <ProductList />
    </div>
  );
};

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

export default ProductsPage;
