import Image1 from "/category/earphone.png";
import Image2 from "/category/watch.png";
import Image3 from "/category/macbook.png";
import Image4 from "/category/gaming.png";
import Image5 from "/category/vr.png";
import Image6 from "/category/speaker.png";
import SubCategory from "./Shared/SubCategory";

import { FaCarSide, FaWallet } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdOutlineVerifiedUser } from "react-icons/md";

const subCategoryData = [
  {
    icon: FaCarSide,
    text1: "Free Shipping",
    text2: "Free Shipping On All Order",
  },
  {
    icon: FaWallet,
    text1: "Safe Money",
    text2: "30 Days Money Back",
  },
  {
    icon: MdOutlineVerifiedUser,
    text1: "Secure Payment",
    text2: "All Payment Secure",
  },
  {
    icon: BiSupport,
    text1: "Online Supoort 24/7",
    text2: "Technical Support 24/7",
  },
];

export default function Category() {
  return (
    <div className="container py-7">
      <div className="py-8 sm:grid flex flex-col sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="w-auto h-[300px] bg-gradient-to-br from-black/90 to-black/70 dark:from-black dark:to-black/95 rounded-3xl flex justify-center items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">Earphone</h3>
          <button className="bg-primary py-2 px-8 rounded-full text-white mt-2 hover:scale-105 duration-300 z-40">
            browse
          </button>
          <img
            src={Image1}
            alt="earphone"
            className="absolute -bottom-2 -right-2 w-3/4 sm:w-auto z-30"
          />
        </div>
        <div className="w-auto h-[300px] bg-gradient-to-br from-brandYellow to-brandYellow/90 rounded-3xl flex justify-center items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">gadget</h3>
          <button className="bg-white py-2 px-8 rounded-full text-brandYellow mt-2 hover:scale-105 duration-300">
            browse
          </button>
          <img
            src={Image2}
            alt="earphone"
            className="absolute translate-x-2/3 translate-y-2/4 bottom-2/3 right-2/4 w-3/4 sm:w-auto z-30"
          />
        </div>
        <div className="col-span-2 w-auto h-[300px] bg-gradient-to-br from-primary to-primary/90 rounded-3xl flex justify-center items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden ">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">Laptop</h3>
          <button className="bg-white py-2 px-8 rounded-full text-primary mt-2 hover:scale-105 duration-300">
            browse
          </button>
          <img
            src={Image3}
            alt="earphone"
            className="absolute bottom-8 right-2 z-30 w-3/5 sm:w-2/5"
          />
        </div>
      </div>
      <div className="py-8 sm:grid flex flex-col sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2 w-auto h-[300px] bg-gradient-to-tr from-gray-400/90 to-gray-100 rounded-3xl flex justify-center items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden ">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">Gaming</h3>
          <button className="bg-primary py-2 px-8 rounded-full text-white mt-2 hover:scale-105 duration-300">
            browse
          </button>
          <img
            src={Image4}
            alt="earphone"
            className="absolute bottom-8 right-2 z-30 w-3/5 sm:w-2/5"
          />
        </div>
        <div className="w-auto h-[300px] bg-gradient-to-br from-brandGreen to-brandGreen/90 rounded-3xl flex justify-start items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">earphone</h3>
          <button className="bg-white py-2 px-8 rounded-full text-brandGreen mt-2 hover:scale-105 duration-300 z-40">
            browse
          </button>
          <img
            src={Image5}
            alt="earphone"
            className="absolute bottom-0 -right-4 z-30 w-3/4 sm:w-4/6"
          />
        </div>
        <div className="w-auto h-[300px] bg-gradient-to-br from-brandBlue to-brandBlue/90 rounded-3xl flex justify-start items-start flex-col gap-1 px-5 pt-10 capitalize relative overflow-hidden">
          <p className="text-white/80">enjoy</p>

          <p className="text-2xl text-white font-bold">With</p>
          <h3 className="text-5xl font-bold text-white/30">gadget</h3>
          <button className="bg-white py-2 px-8 rounded-full text-brandBlue mt-2 hover:scale-105 duration-300 z-40">
            browse
          </button>
          <img
            src={Image6}
            alt="earphone"
            className="absolute bottom-0 right-0 w-3/4 sm:w-4/6 z-30"
          />
        </div>
      </div>
      <div className="flex justify-start sm:justify-center items-center py-16 flex-wrap gap-16">
        {subCategoryData.map((data, index) => (
          <SubCategory
            key={index}
            icon={data.icon}
            text1={data.text1}
            text2={data.text2}
          />
        ))}
      </div>
    </div>
  );
}
