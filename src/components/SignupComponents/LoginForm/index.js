import React, { useState } from "react";
import InputComponent from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)

   const dispatch = useDispatch();
   const navigate = useNavigate()
   

   const handleLogin = async() => {
      setLoading(true)
      if(email && password){

         try{
               const userCredentials = await signInWithEmailAndPassword(
                  auth,
                  email,
                  password
               );
               const user = userCredentials.user;
   
               const userDoc = await getDoc(doc(db, "users", user.uid));
               const userData = userDoc.data();
   
               dispatch(
                  setUser({
                     name: userData.name,
                     email: user.email,
                     uid: user.uid,
                     profilePic: userData.profilePic
                  })
               );
               toast.success("Login successful!")
               setLoading(false)
               navigate("/profile")
   
             } catch(e){
               toast.error(e.message)
               setLoading(false);
             }
      }
      else{
         toast.error("Fill all details!")
      }
   };

   return (
      <div className="input-div">
         <InputComponent
            state={email}
            setState={setEmail}
            placeholder="Email"
            type="email"
            required={true}
         />
         <InputComponent
            state={password}
            setState={setPassword}
            placeholder="Password"
            type="password"
            required={true}
         />
         <Button text={loading ? "Loading..." : "Login"} onClick={handleLogin} disabled={loading} />
      </div>
   );
}

export default LoginForm;
