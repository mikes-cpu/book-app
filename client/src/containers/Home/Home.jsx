import React from "react";
import BookCardList from "../../components/BookCardList";
import HeroSection from "../../components/HeroSection/HeroSection";
import SearchBox from "../../components/SearchBox.js/SearchBox";
import SectionLayout1 from "../../components/SectionLayout1/SectionLayout1";
import "./Home.scss";

function Home({ setSearch, apiResponse }) {
  return (
    <div>
      <HeroSection />
      <SectionLayout1 setSearch={setSearch} apiResponse={apiResponse} />
    </div>
  );
}

export default Home;
