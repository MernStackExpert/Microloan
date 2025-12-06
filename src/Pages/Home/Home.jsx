import React from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import PopularLoans from "./PopularLoans/PopularLoans";
import OurServices from "./services/OurServices ";
import Testimonials from "./Testimonials/Testimonials";
import GetStarted from "./GetStarted/GetStarted";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <PopularLoans/>
      <OurServices/>
      <Testimonials/>
      <GetStarted/>
    </div>
  );
};

export default Home;
