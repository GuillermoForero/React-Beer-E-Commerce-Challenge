import { ProductsProvider } from "@/context/ProductsContext";

import RootLayout from "../app/layout";

import "./styles/index.scss";

const App = ({ Component, pageProps }) => (
  <>
    <RootLayout>
      <ProductsProvider productsList={pageProps?.productsList}>
        <Component {...pageProps} />
      </ProductsProvider>
    </RootLayout>
  </>
);

export default App;
