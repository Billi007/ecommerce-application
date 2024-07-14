import { ChangeEvent, useState } from 'react'
import Sidebar from '../../../components/Sidebar';
function NewProduct() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(3000);
  const [stock, setStock] = useState<number>(3);
  const [photo, setPhoto] = useState<string>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {

  const file:File | undefined = e.target.files?.[0];
  const reader:FileReader = new FileReader();

  if(file){
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if(typeof reader.result === 'string'){
        setPhoto(reader.result);
      }
    }
  }


  }
  return (
    <div className='admin-container'>
      <Sidebar/>
      <main className='new-product'>

        <article>
        <form>
        <h1>New Product</h1>

          <div>
          <label htmlFor="name">Name</label>
          <input 
          required
          type="text" 
          id="name"
          value={name}
          onChange = {e => setName(e.target.value)}
          placeholder="John Smith"
          />
          </div>

          <div>
          <label htmlFor="price">Price</label>
          <input 
          required
          type="text" 
          id="price"
          value={price}
          onChange = {e => setPrice(Number((e.target.value)))}
          placeholder="3000"
          />  
          </div>
          
          <div>
          <label htmlFor="stock">Stock</label>
          <input 
          required
          type="text" 
          id="stock"
          value={stock}
          onChange = {e => setStock(Number((e.target.value)))}
          placeholder="John Smith"
          />
          </div>


         <div>
         <label>Photo</label>
          <input 
          required type='file' onChange={changeImageHandler}
          />
         </div>

           {photo && <img src={photo} alt="img" />}
           <button type='submit'>Create</button>

          </form>
        </article>
      </main>
    </div>
  )
}

export default NewProduct