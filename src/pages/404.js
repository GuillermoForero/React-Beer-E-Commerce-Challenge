import Link from "next/link";

import { fetchProducts } from "@/services/productsService";

const page404 = () => {
  return (
    <div className="container-404">
      <h1>404 - Page Not Found</h1>
      <p>We are sorry, but the page you are looking for does not exist.</p>
      <Link href="/">Volver a la página de inicio</Link>
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

export default page404;
