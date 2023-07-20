import React, { useEffect, useState } from 'react'
import Header from '../components/commonComponents/Header'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcasts } from '../slices/podcastSlice'
import { db } from '../firebase'
import PodcastCard from '../components/commonComponents/Podcasts/PodcastCard.js'
import InputComponent from '../components/commonComponents/Input'

const PodcastsPage = () => {

  const dispatch = useDispatch();
  const podcasts = useSelector(state => state.podcasts.podcasts)

  const [search,setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({id: doc.id, ...doc.data()})
        });
        dispatch(setPodcasts(podcastsData))
      },
      (error) => {
        console.log("Error fetch podcasts", error)
      }
    );

    return () => {
      unSubscribe();
    }

  }, [dispatch])

  var filteredPodcasts = podcasts.filter ((item) => item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  return (
     <div>
        <Header />
        <div className="input-wrapper" style={{ marginTop: "2rem" }}>
           <h1>Discover Podcasts</h1>
           <InputComponent
              state={search}
              setState={setSearch}
              placeholder="Search By Title"
              type="text"
           />
           <p style={{ marginTop: "1.5rem" }}>
              {search && filteredPodcasts.length
                 ? `Search results for "${search}"`
                 : ""}
           </p>
           {filteredPodcasts.length > 0 ? (
              <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
                 {filteredPodcasts.map((item) => {
                    return (
                       <PodcastCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          displayImage={item.displayImage}
                       />
                    );
                 })}
              </div>
           ) : (
              <p>
                 {search
                    ? `Search results for "${search}"`
                    : "No Podcasts Found"}
              </p>
           )}
        </div>
     </div>
  );
}

export default PodcastsPage