import Head from "next/head";

import { ProductsProvider } from "@/context/ProductsContext";

import RootLayout from "../app/layout";

import "./styles/index.scss";

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Beer store</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        rel="stylesheet"
      />
    </Head>
    <RootLayout>
      <ProductsProvider productsList={pageProps?.productsList}>
        <Component {...pageProps} />
      </ProductsProvider>
    </RootLayout>
  </>
);

export default App;
