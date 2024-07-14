import { FormEvent, useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar';

const allleters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^&*()_+=*/";

function Coupon() {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
  await window.navigator.clipboard.writeText(coupon);
  setIsCopied(true)
  }

  useEffect(() => {
  setIsCopied(false);
  }, [coupon])

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if(!includeNumbers && !includeCharacters && !includeCharacters) return alert("Please select at least one of these!")

    let result: string = prefix || "";
    const looplength: number = size - result.length;

    for (let i = 0; i < looplength; i++) {
      let entireString: string = '';
      if (includeNumbers) entireString += allNumbers;
      if (includeCharacters) entireString += allleters;
      if (includeSymbols) entireString += allSymbols;
      
      const randomNum = Math.floor(Math.random()*entireString.length);
      result += entireString[randomNum];

      setCoupon(result)
    }
  }

  return (
    <div className="admin-container">
    <Sidebar/>
    <main className="dashboard-app-container">
      <h1>Coupon</h1>
      <section>
        <form className='coupon-form' onSubmit={formSubmitHandler}>

          <input 
          type="text"
          placeholder="Text to include"
          value={prefix}
          onChange={e => setPrefix(e.target.value)}
          maxLength={size}
           />

          <input 
          type="number"
           placeholder="Coupon Length"
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          min={8}
          max={25}
           /> 

           <fieldset>
             <legend>Include</legend>
         
               <input 
               type="checkbox" 
               checked={includeNumbers} 
               onChange={() => setIncludeNumbers(prev => !prev)}
                /> 
               <label>Numbers</label>
             
            
               <input 
               type="checkbox" 
               checked={includeCharacters} 
               onChange={() => setIncludeCharacters(prev => !prev)}
                /> 
               <label>Characters</label>
            
           
               <input 
               type="checkbox" 
               checked={includeSymbols} 
               onChange={() => setIncludeSymbols(prev => !prev)}
                /> 
               <label>Symbols</label>
           </fieldset>

           <button type='submit'>Generate</button>
        </form>
        {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
      </section>
    </main>
    </div>
  )
}

export default Coupon