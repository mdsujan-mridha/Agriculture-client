import React from 'react';
import Hero from '../Header/Hero';
import OrganicFood from '../Products/OrganicFood';
import Aboutus from '../About/Aboutus';
import CategoryCard from './CategoryCard';
import Contact from '../Contact/Contact';
import Map from './Map';
import FeaturedProduct from './FeaturedProduct';
import HomeBlog from './HomeBlog';


const Home = () => {
    return (
        <div>
            <Hero />
            <CategoryCard />
            <OrganicFood />
            <FeaturedProduct />
            {/* <Aboutus /> */}
            {/* <Contact /> */}
            <HomeBlog />
            <Map />

        </div>
    );
};

export default Home;