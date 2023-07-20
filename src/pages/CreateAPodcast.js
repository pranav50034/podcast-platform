import React from 'react'
import Header from '../components/commonComponents/Header'
import CreatePodcastForm from '../components/StartAPodcast/CreatePodcastForm'

const CreateAPodcast = () => {
  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Create A Podcast</h1>
            <CreatePodcastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcast