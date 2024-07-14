import { ChangeEvent, FormEvent, useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import img from '../../../assets/nikeshoe.jpeg'

function ProductManagement() {
  const [name, setName] = useState<string>("Puma shoes");
  const [price, setPrice] = useState<number>(3000);
  const [stock, setStock] = useState<number>(3);
  const [photo, setPhoto] = useState<string>(img);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {

  const file:File | undefined = e.target.files?.[0];
  const reader:FileReader = new FileReader();

  if(file){
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if(typeof reader.result === 'string'){
        setPhotoUpdate(reader.result);
      }
    }
  }

}

const submitHandler = (e:FormEvent) => {
e.preventDefault();
 setName(nameUpdate); 
  setPrice(priceUpdate);
  setStock(stockUpdate);
  setPhoto(photoUpdate);
}

  return (
    <div className='admin-container'>
      <Sidebar/>
      <main className='new-product'>

        <section>
          <strong>ID - jkd4fdggnd2f</strong>
          <img src={photo} alt="img" />
          <h2>{name}</h2>
          <h3>${price}</h3>
          {
            stock > 0 ?
           (<span className='green'>{stock} Available</span>):
           (<span className='red'>Unavailable</span>)
          }
        </section>

        <article>
        <form onSubmit={submitHandler}>
        <h1>Manage product</h1>

          <div>
          <label htmlFor="name">Name</label>
          <input 
          required
          type="text" 
          id="name"
          value={nameUpdate}
          onChange = {e => setNameUpdate(e.target.value)}
          placeholder="John Smith"
          />
          </div>

          <div>
          <label htmlFor="price">Price</label>
          <input 
          required
          type="text" 
          id="price"
          value={priceUpdate}
          onChange = {e => setPriceUpdate(Number((e.target.value)))}
          placeholder="3000"
          />  
          </div>
          
          <div>
          <label htmlFor="stock">Stock</label>
          <input 
          required
          type="text" 
          id="stock"
          value={stockUpdate}
          onChange = {e => setStockUpdate(Number((e.target.value)))}
          placeholder="John Smith"
          />
          </div>


         <div>
         <label>Photo</label>
          <input 
          required type='file' onChange={changeImageHandler}
          />
         </div>

           {photo && <img src={photoUpdate} alt="img" />}
           <button type='submit'>Update</button>

          </form>
        </article>
      </main>
    </div>
  )
}

export default ProductManagement