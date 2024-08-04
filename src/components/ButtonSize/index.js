const namespace = "button-size";

const ButtonSize = ({ isActive, setActive, sku, name }) => {
  const handleClick = () => {
    setActive(sku);
  };

  return (
    <button
      className={`${namespace} ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default ButtonSize;
