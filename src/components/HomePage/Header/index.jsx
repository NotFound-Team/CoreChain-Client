import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../../theme/ThemeProvider";
import LogoMain from "../../../image/Logo.svg";
import { Link } from "react-router-dom";


function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      
      <div className="flex container mx-auto py-4 items-center justify-between">
        <div>
          <a href="/">
            <img src={LogoMain} alt="company logo" />
          </a>
        </div>
        <div>
          <ul className="flex gap-x-6 text-white">
            <li>
              <a href="/">
                <span>Products v</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>Solutions v</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>Resources v</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>v</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Link to="/login" className="bg-yellow-600 py-4 px-10 rounded-xl hover:text-white hover:bg-yellow-700 transition-all duration-200 ease-in-out">
            Login
          </Link>
          <a href="/" className="bg-[#4F9CF9] py-4 px-10 rounded-xl">
            Try Whitepace free
          </a>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded-[50px] hover:bg-blue-700 transition"
          >
            {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </button>
        </div>
      </div>

    </header>
  );
}

export default Header;