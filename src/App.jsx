import { useEffect, useRef, useState } from 'react'
import './Styles.css'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  useEffect(() => {
    setPassword(passwordGenerator())
  }, [length, numAllowed, charAllowed])

  let passwordGenerator = () => {
    let chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let res=""

    if(numAllowed) {
      chars+="1234567890";
    }
    if(charAllowed) {
      chars+="!@#$%^&*(){}[]<>?";
    }

    for(let i=1;i<=length;i++){
      res+=chars[Math.floor(Math.random()*chars.length)];
    }
    // console.log(res);
    return res;
  }

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  
  return (
    <>
        <h2>Password Generator</h2>
      <div className='parent'>


        <div className='flex1'>
          <input type='text' style={{backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '10px'}} value={password} readOnly ref={passwordRef} />
          <button onClick={copyPassword}>Copy Password</button>
        </div>

        <div className='flex2'>
          <span>
            <input type='range' max={25} min={8} value={length} onChange={(e) => setLength(e.target.value)} />
            <span id='range'>{length}</span>
          </span>

          <span>
            Numbers
            <input type='checkbox' value={numAllowed} onChange={() => setNumAllowed(!numAllowed)}></input>
          </span>

          <span>
            Characters
            <input type='checkbox' value={charAllowed} onChange={() => setCharAllowed(!charAllowed)}></input>
          </span>
        </div>

      </div>
    </>
  )
}

export default App
