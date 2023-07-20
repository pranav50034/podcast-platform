import React from 'react'
import { useSelector } from 'react-redux'
import Header from "../components/commonComponents/Header/index"
import Button from '../components/commonComponents/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate();

    if(!user) {
      return (
        <div>
          <Header/>
          <p>Loading...</p>
        </div>
      )
    }

    const handleLogout = () => {
      signOut(auth).then(() => {
          toast.success("Logged out!");
          // navigate("/")

      }).catch((error) => {
        toast.error(error.message)
      })
    }

    return (
      <div>
          <Header/>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button text={"Logout"} onClick={handleLogout}/>
      </div>
    )
}

export default ProfilePage