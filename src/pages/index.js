import React from "react";

const ProductsPage = () => {
  return (
    <div>
      <h1>index</h1>
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
