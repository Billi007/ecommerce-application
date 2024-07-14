import {useState} from 'react'
import { OrderItemType,OrderType } from '../../../Types';
import img from '../../../assets/nikeshoe.jpeg'
import Sidebar from '../../../components/Sidebar';
import { Link } from 'react-router-dom';

function TransactionManagement() {
  const orderItem:OrderItemType[] = [
    {
      name: "Puma Shoes",
      photo: img,
      _id: "asdsaasdas",
      quantity: 4,
      price: 2000,
    },
  ];

  const [order, setOrder] = useState<OrderType>({
    name: "Tanishka Gupta",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pincode: 2434341,
    status: "Processing",
    subTotal: 71000,
    discount: 1200,
    shippingCharge: 0,
    tax: 700,
    totalAmount: 71000 + 700 + 0 - 1200,
    orderItem,
    _id: "asdnasjdhbn",
  });
 
  const {
    name,
    address,
    city,
    country,
    state,
    pincode,
    subTotal,
    shippingCharge,
    tax,
    discount,
    totalAmount,
    status,
  } = order;

  const updateHander = () => {
    setOrder(prev => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }))
  }

  return (
    <div className="admin-container">
      <Sidebar/>
      <main className="transaction-manager">

        <section>
          <h2 className='title'>Order Items</h2>
             
          {
            order.orderItem.map((item) => (
              <ProductCard
                name={item.name}
                photo={item.photo}
                price={item.price}
                quantity={item.quantity}
                _id={item._id}
              />
            ))
          }
        </section>

        <article className='shipping-info-card'>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}
          </p>

          <h5>Amount Info</h5>
          <p>Subtotal: {subTotal}</p>
          <p>Shipping Charges: {shippingCharge}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {totalAmount}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>
          <button onClick={updateHander}>Process Status</button>
        </article>
      </main>
    </div>
  )
}


const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className='transaction-product-card'>
    <img src={photo} alt={name} width='80px' height='80px' />
   <Link to= {`/admin/produts/${_id}`}>{name}</Link>
    <span>${price} X {quantity} = ${price * quantity}</span>
  </div>

)

export default TransactionManagement