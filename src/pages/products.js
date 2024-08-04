import React from "react";
import ProductList from "../components/ProductList/ProductList";
import MenuIcon from "@/icons/menuIcon";

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

export async function getStaticProps(test) {
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

export default ProductsPage;
