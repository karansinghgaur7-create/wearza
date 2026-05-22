import React from 'react'
import Banner from "../components/banner/Banner"
import LatestCollection from '../components/collection/LatestCollection';
import Ourpolicy from '../components/ourpolicy/Ourpolicy';
import NewletterBox from '../components/NewletterBox/NewletterBox';


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
