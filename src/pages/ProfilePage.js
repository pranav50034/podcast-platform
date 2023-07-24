import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/commonComponents/Header/index";
import Button from "../components/commonComponents/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/commonComponents/Loader";
import image from "../assets/5856.jpg";
import { collection, getDocs, query, where } from "firebase/firestore";
import PodcastCard from "../components/commonComponents/Podcasts/PodcastCard.js";

const ProfilePage = () => {
   const user = useSelector((state) => state.user.user);
   const navigate = useNavigate();

   const [podcasts, setPodcasts] = useState([]);

   useEffect(() => {
      const fetchDocs = async () => {
         const q = query(
            collection(db, "podcasts"),
            where("createdBy", "==", user.uid)
         );
         const querySnapshot = await getDocs(q);
         const docsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setPodcasts(docsData);
      };
      if (user) {
         fetchDocs();
      }
   }, [user]);

   if (!user) {
      return (
         <div>
            <Header />
            <Loader />
         </div>
      );
   }

   const handleLogout = () => {
      signOut(auth)
         .then(() => {
            toast.success("Logged out!");
            // navigate("/")
         })
         .catch((error) => {
            toast.error(error.message);
         });
   };

   console.log(podcasts);

   return (
      <div>
         <Header />
         {/* <h1>{user.name}</h1>
         <h1>{user.email}</h1>
         <h1>{user.uid}</h1> */}

         <div className="input-wrapper">
            <img
               style={{
                  width: "150px",
                  borderRadius: "50%",
                  marginBottom: "2rem",
               }}
               src={image}
            />
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <div>
               {podcasts.length == 0 ? (
                  <p style={{ fontSize: "1.3rem" }}>
                     You have not created any podcasts yet!
                  </p>
               ) : (
                  <>
                     <p style={{ fontSize: "1.3rem", marginBottom: "1.3rem", textAlign: "center" }}>Your Podcasts!</p>
                     <div
                        style={{
                           display: "flex",
                           gap: "2.5rem",
                           marginBottom: "2rem",
                        }}
                     >
                        {podcasts.map((podcast) => {
                           return (
                              <PodcastCard
                                 id={podcast.id}
                                 key={podcast.id}
                                 title={podcast.title}
                                 displayImage={podcast.displayImage}
                              />
                           );
                        })}
                     </div>
                  </>
               )}
            </div>
            <Button text={"Logout"} width={"20%"} onClick={handleLogout} />
         </div>
      </div>
   );
};

export default ProfilePage;
