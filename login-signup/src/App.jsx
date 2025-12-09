import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ ismobile, setIsmobile] = useState(false);

  return (
    <>
      <div>
        <h1>Login</h1>
        <div className="container">
          <div className="formcontainer">
            <form className="form">
              <label className = "change2 content">
                {ismobile ? "Mobilenumber:" : "Email:"}
                <input
                  type = {ismobile ? "tel" : "text"}
                  name={ismobile ? "mobile" : "email"}
                  required
                  />
              </label>
              <label className='content'>
                Password:
                <input type="password" name="password" required />
              </label>
              <button className = "login" type="submit" onClick={()=>{handlesubmit(e)}}>Login</button>
              <button type = "button" className = "change" onClick={()=>setIsmobile(!ismobile)}>{!ismobile ? "Login through Mobilenumber":"Login through email"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
