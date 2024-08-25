import React from "react";

export default function Banner() {
  return (
    <div className="container py-16">
      <div className="w-full h-auto lg:h-[460px] py-8 px-2 bg-primary rounded-3xl grid grid-cols-1 md:grid-cols-3 items-center relative">
        <div className="container">
          <p className="uppercase text-white">30% off</p>
          <h2 className="uppercase text-4xl lg:text-7xl text-white font-bold">
            Fine Smile
          </h2>
          <h4 className="capitalize text-white"> 10 jan to 28 jan</h4>
        </div>
        <img
          src="/hero/headphone.png"
          alt="hero"
          className="scale-75 lg:scale-110 mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
        />
        <div className="grid gap-4 text-start items-start p-8">
          <h3 className="text-xl font-bold text-white">Air Solo Bass</h3>
          <h2 className="capitalize text-3xl lg:text-5xl text-white font-bold">
            Winter Sale
          </h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing laborum?
          </p>
          <div className="">
            <button className="py-2 px-4 rounded-full bg-white text-primary hover:scale-105 duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
