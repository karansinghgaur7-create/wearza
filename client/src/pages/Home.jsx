import React from 'react'
import Banner from "../components/banner/Banner.jsx"
import LatestCollection from '../components/collection/LatestCollection.jsx';
import Ourpolicy from '../components/ourpolicy/OurPolicy.jsx';
import NewletterBox from '../components/NewletterBox/NewletterBox.jsx';


const Home = () => {
  return (
    <div>
       <Banner />
       <LatestCollection/>
       <Ourpolicy/>
       <NewletterBox/>
    </div>
  )
}

export default Home;
