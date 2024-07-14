import { ChangeEvent, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Shipping() {
    const [shippingInfo, setShipiingInfo] = useState({
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",

    });

    const navigate = useNavigate()
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShipiingInfo((prev) => ({...prev, [e.target.name]: e.target.value }));
    };
  return (
    <div className='shipping'>
        <button className='back-btn' onClick={() => navigate('/cart')}><IoArrowBackCircleOutline /> </button>

        <form>
        <h1>shipping address</h1>

           <input
            required
            type="text"
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            />

          <input
           required
            type="text"
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            />

            <input
             required
            type="text"
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            />

           <select
            name="country"
            required
            value={shippingInfo.country}
            onChange={handleChange}
            >
            <option value="">Choose Country</option>
            <option value="india">India</option>
            <option value="united states">United States</option>
            <option value="united kingodm">United Kingdom</option>
            <option value="africa">Africa</option>
            <option value="japan">Japan</option>
            <option value="china">China</option>
            <option value="srilanka">Sri Lanka</option>
            <option value="russia">Russia</option>
            </select>
            
            <input
             required
            type="number"
            placeholder="pincode"
            name="pincode"
            value={shippingInfo.pincode}
            onChange={handleChange}
            />

           <button type="submit">Pay Now</button> 

        </form>
    </div>
  )
}

export default Shipping
