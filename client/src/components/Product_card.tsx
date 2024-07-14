import { Link } from "react-router-dom";
import { useState } from "react";

const server = "hjkyhfvk";

type ProductProps = {
    name: string,
    price: number,
    stock: number,
    productId: string,
    image: string,
    description: string,
    addToCart: (product: ProductProps) => void,
}
function Productcard({name,price,stock,image,productId,addToCart,description}: ProductProps) {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  return <div className="product-card">
    <img src={image} alt={name} width='250px' />
    <h4>{name}</h4>
    <button className="desc" onClick={toggleDescription}>
        {isDescriptionVisible ? 'See less' : 'Read more'}
      </button>
      {isDescriptionVisible && (
        <p>
          {description}
        </p>
      )}
    
  <div>
  <span>₹{price} </span>
  <Link to={'/cart'}><button> Add to cart </button></Link>
  </div>
   
  </div>
}

export default Productcard
