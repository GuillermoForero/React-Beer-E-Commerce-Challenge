import { useProducts } from "@/context/ProductsContext";
import BackIcon from "@/icons/BackIcon";
import DotsIcon from "@/icons/DotsIcon";
import { useState, useEffect } from "react";
import ButtonSize from "../ButtonSize";
import Link from "next/link";
import BagIcon from "@/icons/BagIcon";

const namespace = "product-detail";

const ProductDetails = ({ id }) => {
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);

  useEffect(() => {
    if (id) {
      const productId = id.split("-")[0];
      if (Number.isInteger(parseInt(productId, 10))) {
        setProduct(products.find((element) => element.id == productId));
      }
    }

    const fetchStockPrice = () => {
      if (selectedSku) {
        fetch(`http://localhost:5000/api/stock-price/${selectedSku}`)
          .then((res) => res.json())
          .then((data) => setStockPrice(data))
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const interval = setInterval(fetchStockPrice, 5000);

    return () => clearInterval(interval);
  }, [selectedSku]);

  const handleSelectSku = (sku) => {
    fetch(`http://localhost:5000/api/stock-price/${sku}`)
      .then((res) => res.json())
      .then((data) => setStockPrice(data))
      .catch((err) => {
        console.log(err);
      });
    setSelectedSku(sku);
  };
  if (!product) return <div>Loading...</div>;

  return (
    <div className={`${namespace}__container`}>
      <div className={`${namespace}__icons-container`}>
        <Link href="/products">
          <BackIcon />
        </Link>
        <p>Detail</p>
        <DotsIcon />
      </div>
      <img className={`${namespace}__image`} src={product.image} />
      <div className={`${namespace}__text-container`}>
        <div className={`${namespace}__price-container`}>
          <p className={`${namespace}__name`}>Modelo Especial</p>
          {stockPrice?.price && (
            <p className={`${namespace}__price`}>${stockPrice.price}</p>
          )}
        </div>
        <div className={`${namespace}__stock-container`}>
          <p>
            Origin: {product.origin}
            {stockPrice?.stock && ` | Stock: ${stockPrice.stock}`}
          </p>
        </div>
        <h3 className={`${namespace}__description`}>Description</h3>
        <p className={`${namespace}__information`}>{product.information}</p>
        <h3 className={`${namespace}__size`}>Size</h3>
        <div className={`${namespace}__size-container`}>
          {product.skus.map((sku) => (
            <ButtonSize
              key={sku.code}
              isActive={sku.code === selectedSku}
              setActive={handleSelectSku}
              sku={sku.code}
              name={sku.name}
            />
          ))}
        </div>
        <div className={`${namespace}__buy-icons-container`}>
          <button className={`${namespace}__bag-icon`}>
            <BagIcon />
          </button>
          <button className={`${namespace}__add-to-cart-icon`}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
