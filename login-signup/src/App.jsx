import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ ismobile, setIsmobile] = useState(false);
  const[otpsent, setOtpSent] = useState(false);
  const[otp, setOtp] = useState(new Array(6).fill(""));
  const [fotp,setfotp] = useState("");

  const handlesubmit = async(e) =>{
    if (!e.target.checkValidity()) {
    // Force browser to show errors
    e.target.reportValidity();
    return;
   }
    e.preventDefault();
    setOtpSent(true);
    const data = new FormData(e.target);
    const d = await fetch("http://localhost:5000/login",{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        mobile: data.get("mobile")||"", 
        email: data.get("email")||"",
        password: data.get("password")
      })
    })
    const res = await d.json();
    setfotp(res.otp);

  }

  const handleotp = (e) =>{
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    if(enteredOtp === fotp){
      alert("OTP verified successfully!");
    }else{
      alert("Invalid OTP. Please try again.");
    }
    // Here you can add logic to verify the OTP with the backend
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
                  type = {ismobile ? "tel" : "email"}
                  name={ismobile ? "mobile" : "email"}
                  pattern={ismobile ? "[0-9]{10}" : "^[a-zA-Z0-9._%+\\-]+@gmail\\.com$"}
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
            <form className="otpform" onSubmit={handleotp}>
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
