import React from "react";
import Navbar from "../components/home/Navbar/Navbar";
import Hero from "../components/home/Hero";
import Category from "../components/home/Category";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";

export default function Home() {
  return (
    <div className="dark:bg-[#111827]">
      <Navbar />
      <Hero />
      <Category />
      <Banner />
      <Products />
    </div>
  );
}
