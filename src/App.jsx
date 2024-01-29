import { useState , useCallback,useEffect,useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numAllowed,setnumAllowed] = useState(false)
  const [charAllowed,setcharAllowed] = useState(false)
  const [password,setpassword] = useState("")

  const passwordref = useRef(null)
console.log("password");
  const passwordGenerator = useCallback(() => { // useCallback m optimisation ki baat hoti h !
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUCWXYZ"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}~"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      
      pass += str.charAt(char)
    }
    
    setpassword(pass) 
// setpassword(dependency) sare function ko cache memory m rkhta h
  },[length,numAllowed,charAllowed,setpassword]) 

console.log("length not fixed");

const copyPasswordToClipboard = useCallback(() => {
  passwordref.current?.select()
 // passwordref.current?.setSelectionRange(0,7);
  window.navigator.clipboard.writeText(password)
},[password])

  // useEffect m agr dependencies m kuch bi change aata h to dobara se run kr do uskoo

useEffect (() => {
    passwordGenerator()
} , [length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
  <div className='w-full max-wd-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-400 ' >
    <h1 className='text-center text-blue-700'>Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4' >
<input 
type="text" 
value={password}
className='outline-none w-full py-1 px-3'
placeholder='Password'
readOnly
ref={passwordref}
/>
<button 
onClick={copyPasswordToClipboard}
className='text-white bg-blue-700'>copy</button>
   </div>
   <div className='flex text-sm gap-x-2 bg-yellow-500'>
    <div className='flex items-center gap-x-1 '>
      <input  
      type='range'
      min={8}
      max={56}
      value={length}
      className='cursor-pointer' 
      onChange={(e) => {setlength(e.target.value)}}/>
      <label >Length : {length} </label>

    </div>
    <div className='flex items-center gap-x-1'>
      <input 
       type='checkbox'
       defaultChecked = {numAllowed}
       id='numberInput'
       onChange={() => { setnumAllowed((prev) => !prev   )}}      
      />
    </div>
    <label> Numbers </label>
    <div className='flex items-center gap-x-1'>
      <input 
       type='checkbox'
       defaultChecked = {charAllowed}
       id='char'
       onChange={() => { setcharAllowed((prev) => !prev   )}}      
      />
    </div>
    <label> Characters </label>
   </div>
  </div>
    </>
  )
}

export default App
