import React, { useState } from "react";
import Header from "../components/commonComponents/Header";
import SignupForm from "../components/SignupComponents/SignUpForm.js/index.js";
import LoginForm from "../components/SignupComponents/LoginForm";

const SignUpPage = () => {
   const [flag, setFlag] = useState(false);

   return (
      <div>
         <Header />
         <div className="input-wrapper">
            {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
            {!flag ? <SignupForm /> : <LoginForm/>}
            {!flag ? (
               <p className="switch" onClick={() => setFlag(!flag)}>
                  Already have an account? Login
               </p>
            ) : (
               <p className="switch" onClick={() => setFlag(!flag)}>
                  Don't have an account? Signup
               </p>
            )}
         </div>
      </div>
   );
};

export default SignUpPage;
