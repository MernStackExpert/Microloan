import React from "react";
import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import PopularLoans from "./PopularLoans/PopularLoans";
import OurServices from "./services/OurServices ";
import Testimonials from "./Testimonials/Testimonials";
import GetStarted from "./GetStarted/GetStarted";
import FAQ from "./FAQ/FAQ";
import PageTitle from "../../Components/PageTitle";
import Stats from "./Stats/Stats";
import LatestNews from "./LatestNews/LatestNews";
import Newsletter from "./Newsletter/Newsletter";

const Home = () => {
  return (
    <div className="space-y-0">
      <PageTitle title="Home" />

      <Hero />
      <Stats />
      <Features />
      <PopularLoans />
      <OurServices />
      <LatestNews />
      <Testimonials />
      <GetStarted />
      <FAQ />
      <Newsletter /> 
    </div>
  );
};

export default Home;