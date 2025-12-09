import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ ismobile, setIsmobile] = useState(false);
  const[otpsent, setOtpSent] = useState(false);
  const[otp, setOtp] = useState(new Array(6).fill(""));

  const handlesubmit = async(e) =>{
    e.preventDefault();
    setOtpSent(true);
    const data = new FormData(e.target);
    const d = await fetch("http://localhost:5000/login",{
      method: "POST",
      body: data.get(ismobile ? "mobile" : "email")
    })
  }

  const handleotpchange = (e, index) =>{
    if(isNaN(e.target.value)) return;
    const newotp = [...otp];
    newotp[index] = e.target.value;
    setOtp(newotp);
    if (e.target.nextSibling && e.target.value !== "") {
    e.target.nextSibling.focus();
    }
  }
  const handlekeydown = (e,i) =>{
    if(e.key === "Backspace"){
      if(otp[i] === ""){
        if(i===0) return;
        e.preventDefault();
        const prev = e.target.parentNode.children[i - 1];
        prev.focus();
      }
    }
  }
  // const handleotpsubmit = (e) =>{
  //   e.preventDefault();
  //   const data = await fetch
  // }

  return (
    <>
      <div>
        <h1>Login</h1>
        <div className="container">
          <div className="formcontainer">
            <form className="form" onSubmit={(e)=>{handlesubmit(e)}}>
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
              <button className = "login" type="submit" >Login</button>
              <button type = "button" className = "change" onClick={()=>setIsmobile(!ismobile)}>{!ismobile ? "Login through Mobilenumber":"Login through email"}</button>
            </form>
          </div>
        </div>
      </div>
      {otpsent &&(
        <div className="otpcontainer">
          <div className="otpformcontainer">
            <form className="otpform" onSubmit={handleotpsubmit}>
              Enter OTP:
              <label className='content'>
                {
                otp.map((data, i)=>(
                  <input type="text" key = {i} 
                  value = {data} onChange={(e)=>handleotpchange(e,i)}
                  onKeyDown={(e)=>handlekeydown(e,i)}
                  maxLength="1" name="otp" required 
                  />
                ))
              }
              </label>
              <button className = "verify" type="submit">Verify</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App
