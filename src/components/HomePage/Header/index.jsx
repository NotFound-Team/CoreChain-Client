import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";

import { useTheme } from "../../../theme/ThemeProvider";
import LogoMain from "../../../image/Logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div className="flex container max-md:px-4 mx-auto py-4 max-sm:py-2 items-center justify-between">
        <div>
          <a href="/">
            <img src={LogoMain} alt="company logo" />
          </a>
        </div>
        <ul className="flex-center gap-x-6 text-white max-md:hidden">
          <li>
            <a href="/" className="flex items-center gap-x-2">
              <span>Products</span>
              <RiArrowDownSLine />
            </a>
          </li>
          <li>
            <a href="/" className="flex items-center gap-x-2">
              <span>Solutions</span>
              <RiArrowDownSLine />
            </a>
          </li>
          <li>
            <a href="/" className="flex items-center gap-x-2">
              <span>Resources</span>
              <RiArrowDownSLine />
            </a>
          </li>
          <li>
            <a href="/">
              <span>
                <RiArrowDownSLine />
              </span>
            </a>
          </li>
        </ul>
        <div className="flex-center gap-x-4">
          <Link
            to="/login"
            className="bg-yellow-600 rounded-xl xl:py-4 xl:px-10 lg:py-2 lg:px-6 lg:block max-md:hidden hover:text-white hover:bg-yellow-700 transition-all duration-200 ease-in-out"
          >
            Login
          </Link>
          <a
            href="/"
            className="bg-[#4F9CF9] xl:py-4 xl:px-10 rounded-xl lg:py-2 lg:px-6 lg:block max-md:hidden"
          >
            Try Whitepace free
          </a>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded-[50px] hover:bg-blue-700 transition"
          >
            {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
          <div className="text-white md:hidden max-md:block">
            <FaBars />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
