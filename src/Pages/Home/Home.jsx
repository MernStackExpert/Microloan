import React from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import PopularLoans from "./PopularLoans/PopularLoans";
import OurServices from "./services/OurServices ";
import Testimonials from "./Testimonials/Testimonials";
import GetStarted from "./GetStarted/GetStarted";
import FAQ from "./FAQ/FAQ"
import PageTitle from "../../Components/PageTitle";

const Home = () => {
  return (
    <div>
            <PageTitle title="Home" />

      <Hero />
      <Features/>
      <PopularLoans/>
      <OurServices/>
      <Testimonials/>
      <GetStarted/>
      <FAQ/>
    </div>
  );
};

export default Home;
