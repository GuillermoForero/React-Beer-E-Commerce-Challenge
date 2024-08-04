import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { useProducts } from "@/context/ProductsContext";
import BackIcon from "@/icons/BackIcon";
import DotsIcon from "@/icons/DotsIcon";
import BagIcon from "@/icons/BagIcon";
import { fetchStockPrice } from "@/services/productsService";

import ButtonSize from "../ButtonSize";

const namespace = "product-detail";

const ProductDetails = ({ id }) => {
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [stockPrice, setStockPrice] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        setShowReadMore(contentRef.current.clientHeight > 96);
      }
    }, 0);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (id) {
      const productId = id.split("-")[0];
      if (Number.isInteger(parseInt(productId, 10))) {
        setProduct(products.find((element) => element.id == productId));
      }
    }

    const fetchStockPriceLoopFunction = async () => {
      if (selectedSku) {
        const data = await fetchStockPrice(selectedSku);
        setStockPrice(data);
      }
    };
    const interval = setInterval(fetchStockPriceLoopFunction, 5000);

    return () => clearInterval(interval);
  }, [selectedSku]);

  const handleSelectSku = async (sku) => {
    const data = await fetchStockPrice(sku);
    setStockPrice(data);
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
        <div
          ref={contentRef}
          className={`${namespace}__information-container ${
            expanded ? "expanded" : ""
          }`}
          data-testid="information-container"
        >
          <p
            className={`${namespace}__information ${
              expanded ? "expanded" : ""
            } ${showReadMore ? "show-read" : ""}`}
          >
            {product.information}
          </p>
          {showReadMore && (
            <button
              className="text-blue-500 cursor-pointer mt-2 focus:outline-none"
              onClick={toggleExpand}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
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
