import { Link } from 'react-router-dom'
import Productcard from '../components/Product_card'
import img from '../assets/71jG+e7roXL._AC_UF1000,1000_QL80_.jpg'


function Home() {
  const addToCart = () => {}
  return (
    <div className='home'>
      <section></section>
      <h1>Latest Products
      <Link className='findmore' to={'/search'}>MORE</Link>
      </h1>
      
      <main>
        <Productcard 
        name='Apple MacBook Air Laptop'
        description='M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard,
         FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey'
         price={50000}
         productId='bsfr'
         addToCart={addToCart}
         stock={5}
         image={img}
        />
      </main>
    </div>
  )
}

export default Home
