import { useEffect, useState } from 'react'
import { VscError } from "react-icons/vsc";
import CartItem from '../components/Cart_item';
import img from '../assets/71jG+e7roXL._AC_UF1000,1000_QL80_.jpg'
import { Link } from 'react-router-dom';

const cartItems = [
  {
    prouctId: "i7tgyff",
    name: 'Apple MacBook Air Laptop',
    price: 50000,
    image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600',
    quantity: 1,
    stock: 10,
  }
];
const subtotal = 50000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 4000;
const total = subtotal + tax + shippingCharges - discount


function Cart() {
  const [couponCode, setCuoponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const ID = setTimeout(() => {
     if(couponCode === ("HAPPY" && "YAYY")) setIsValidCouponCode(true);
     else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(ID);
      setIsValidCouponCode(false);
    }
  },[couponCode])
  return (
    <div className='cart'>
      <main>
        {cartItems.length > 0 ?  cartItems.map((i, index) => (
            <CartItem
              key={index}
              cartItem={i}
            />
          )) : <h1>No items Added</h1>}
        </main> 

      
      <aside>
      <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>Discount: <em className="red"> -₹{discount}</em></p>
        <p><b>Total: ₹{total}</b></p>

        <input 
        type="text"
        value={couponCode}
        onChange={(e) => setCuoponCode(e.target.value)}
        placeholder='coupon code' />

        {
          couponCode && (isValidCouponCode? 
          <span className='green'>₹{discount} off using <code>{couponCode}</code></span> :
         (
          <span className='red'>Invalid coupon <VscError/> </span>
         ))}


         {cartItems.length > 0 && <Link to={'/shipping'}>Checkout</Link>}
      </aside>
      </div>
  )
}

export default Cart
