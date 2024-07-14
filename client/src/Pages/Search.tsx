import {useState} from 'react'
import Productcard from '../components/Product_card';
import img  from '../assets/71jG+e7roXL._AC_UF1000,1000_QL80_.jpg'

function Search() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {}; 
  const isNextPage = true;
  const isPreviousPage = true;

  return (
    <div className='product-search'>
     <aside>
      <h1>FILTERS</h1>

       <div>
        <h4>Sort</h4>
        <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">None</option>
        <option value="asc">Price (Low to High)</option>
        <option value="dsc">Price (High to Low)</option>
       </select>
       </div>

       <div>
        <h4>Max Price: {maxPrice || ""} </h4>
         <input 
         className='range'
         type='range' 
         min={100} 
         max={1000000} 
         value={maxPrice} 
         onChange={e => setMaxPrice(Number((e.target.value)))} />
       </div>

       <div>
        <h4>Category</h4>
        <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="camera">CAMERA</option>
        <option value="game">GAME</option>
        <option value="laptop">LAPTOP</option>
       </select>
       </div>
     </aside>


     <main>
      <h1>PRODUTCS</h1>
      <input 
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder='Search by name...'/>

     <div className='search-product-list'>
      <Productcard
      productId="gsgiksgf"
      name="Apple MacBook Air Laptop"
      price={50000}
      stock={3}
      addToCart={addToCartHandler}
      image={img}
      description='M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard,
         FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Space Grey'
      />
     </div>

     <article>
      <button 
      onClick={() => setPage(prev => prev - 1)}
      disabled={!isPreviousPage}
      >
      Prev</button>
      <span>{page} of {4} </span>
      <button 
      onClick={() => setPage(prev => prev + 1)}
      disabled={!isNextPage}
      >Next</button>
     </article>
     </main>
    </div>
  )
}

export default Search
