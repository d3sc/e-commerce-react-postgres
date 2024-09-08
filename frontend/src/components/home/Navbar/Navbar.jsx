import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdLogin, MdDashboard } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import DarkMode from "./DarkMode";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "Shop",
    link: "/#",
  },
  {
    id: 3,
    name: "About",
    link: "/#",
  },
  {
    id: 4,
    name: "Blogs",
    link: "/#",
  },
];

const DropDownLinks = [
  {
    id: 1,
    name: "Trending Products",
    link: "/#",
  },
  {
    id: 2,
    name: "Best Selling",
    link: "/#",
  },
  {
    id: 3,
    name: "Top Rated",
    link: "/#",
  },
];
export default function Navbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl "
            >
              Eshop
            </a>
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4 ">
                {MenuLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}

                <li className="relative cursor-pointer group">
                  <a
                    href="#"
                    className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                  >
                    Quicks Links
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </a>

                  <div className="absolute z-[999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white">
                    <ul className="space-y-2">
                      {DropDownLinks.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.link}
                            className="text-gray-500 hover:text-black dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search.."
                className="search-bar"
              />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-pretty group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>
            {user?.error || user == null ? (
              <Link to={"/login"} className="relative">
                <MdLogin className="text-2xl text-gray-600 dark:text-gray-400" />
              </Link>
            ) : (
              <Link to={"/dashboard"} className="relative">
                <MdDashboard className="text-2xl text-gray-600 dark:text-gray-400" />
              </Link>
            )}

            <div className="">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
