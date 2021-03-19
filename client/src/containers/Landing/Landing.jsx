import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import SectionLayout1 from "../../components/SectionLayout1/SectionLayout1";
import "./Landing.scss";

function Landing({ setSearch, apiResponse }) {
  return (
    <div>
      <HeroSection />
      <SectionLayout1 setSearch={setSearch} apiResponse={apiResponse} />
    </div>
  );
}

export default Landing;
