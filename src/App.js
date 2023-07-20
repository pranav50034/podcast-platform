import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/commonComponents/PrivateRoutes";
import CreateAPodcast from "./pages/CreateAPodcast";
import PodcastsPage from "./pages/PodcastsPage";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";
 
function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
         if(user) {
            const unsubscribeSnapshot = onSnapshot (
               doc(db, "users", user.uid),
               (userDoc) => {
                  if(userDoc.exists()) {
                     const userData = userDoc.data();
                     dispatch(
                        setUser({
                           name: userData.name,
                           email: userData.email,
                           uid: user.uid,
                        })
                     );
                  }
               },
               (error) => {
                  console.log(error)
               }
            );

            return () => {
               unsubscribeSnapshot();
            };
         }
      });

      return () => {
         unsubscribeAuth();
      };
   }, []);

   return (
      <div className="App">
         <ToastContainer />
         <Routes>
            <Route path="/" element={<SignUpPage />} />
            <Route element={<PrivateRoutes/>}>
               <Route path="/profile" element={<ProfilePage/>} />
               <Route path="/create-a-podcast" element={<CreateAPodcast/>} />
               <Route path="/podcasts" element={<PodcastsPage/>} />
               <Route path="/podcast/:id" element={<PodcastDetails/>} />
               <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode/>} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;

