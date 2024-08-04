import { useRouter } from "next/router";

const namespace = "product-list-card";
const ProductListCard = ({ image, name, rating, price, id, brand }) => {
  const router = useRouter();
  return (
    <div
      className={`${namespace}__container`}
      onClick={() =>
        router.push(`/product/${id}-${brand.toLowerCase().replace(" ", "-")}`)
      }
      role="button"
    >
      <p className={`${namespace}__name`}>{brand}</p>
      <img className={`${namespace}__image`} src={image} alt={name} />
      {rating && (
        <div className={`${namespace}__rating-container`}>
          <span className={`${namespace}__star`}>⭐</span>
          <span className={`${namespace}__rating-text`}>{rating}</span>
        </div>
      )}

      <div className={`${namespace}__price`}>${price}</div>
      <button className={`${namespace}__button`}>+</button>
    </div>
  );
};

export default ProductListCard;
