import React, {useState} from "react";
import InputComponent from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";
import {auth, db} from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupForm() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSignup = async() => {
       console.log("Handling Signup...");
       setLoading(true);
       if(password==confirmPassword && password.length>=6 ){
         try{
            // creating user's account
            const userCredentials = await createUserWithEmailAndPassword(
               auth,
               email,
               password
            );
            const user = userCredentials.user;
            console.log(user)

            //saving user's details
            await setDoc(doc(db, "users", user.uid),{
               name : fullName,
               email : user.email,
               uid : user.uid
            });

            //saving data in the redux
            dispatch(
               setUser({
                  name: fullName,
                  email: user.email,
                  uid: user.uid,
               })
            );

            toast.success("Signed up successfully")
            setLoading(false)
            
            navigate("/profile")
            
         } catch(e){
            console.log(e)
            toast.error(e.message);
            setLoading(false)
          }
       }
       else{
         if (password != confirmPassword) {
            toast.error("Passwords do NOT match.");
         } else if (password.lenght < 6) {
            toast.error("Password is too short(<6)");
         }

         setLoading(false)
       }
    };

   return (
      <div className="input-div">
        <InputComponent
              state={fullName}
              setState={setFullName}
              placeholder="Full Name"
              type="text"
              required={true}
           />
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
           <InputComponent
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="Confirm Password"
              type="password"
              required={true}
           />
           <Button text={loading ? "Loading..." : "Signup"} disabled={loading} onClick={handleSignup}/>
      </div>
   );
}

export default SignupForm;
