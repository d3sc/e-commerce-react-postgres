import { Link } from "react-router-dom";

// ICONS
import {
  LuBox,
  LuUser,
  LuShoppingCart,
  LuLogOut,
  LuHeart,
} from "react-icons/lu";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);
  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/dashboard/cart", name: "Cart", icon: LuShoppingCart },
    { id: 3, path: "/dashboard/likes", name: "Likes", icon: LuHeart },
  ];

  useEffect(() => {
    const id =
      SIDEBAR_LINKS.find((item) => item.path == window.location.pathname)?.id -
      1;
    setActiveLink(id);
  }, [activeLink, window.location.pathname]);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white ">
      <Link to={"/"} className="mb-8">
        <img src="/logo.svg" alt="logo" className="w-28 hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </Link>

      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`flex justify-center font-medium rounded-md hover:bg-gray-100 hover:text-indigo-500 cursor-pointer ${
              activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5 py-2 px-5 w-full"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <Link
          to={"/logout"}
          className="flex justify-center items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full"
        >
          {" "}
          <span className="text-start">
            <LuLogOut size={20} />
          </span>{" "}
          <span className="hidden md:flex">Logout</span>
        </Link>
      </div>
    </div>
  );
}
