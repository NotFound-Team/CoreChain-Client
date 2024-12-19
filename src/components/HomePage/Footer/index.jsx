import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../../../image/Logo.svg";

function Footer() {
  return (
    <footer className="dark:bg-gray-900 dark:text-gray-100 bg-[#043873] py-10">
      <div className="container mx-auto max-md:px-4">

        <div className="flex items-start justify-between gap-x-10 mb-20 text-white max-md:flex-col max-md:justify-center max-md:items-center max-md:text-center max-md:gap-y-8">
          <ul className="max-w-60 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center">
            <li>
              <img src={Logo} alt="logo company" />
            </li>
            <li>
              <p>
                whitepace was created for the new ways we live and work. We make
                a better workspace around the world
              </p>
            </li>
          </ul>
          <ul className="flex flex-col gap-y-4">
            <li>
              <h3 className="text-xl font-bold">Product</h3>
            </li>
            <li>
              <p>Overview</p>
            </li>
            <li>
              <p>Pricing</p>
            </li>
            <li>
              <p>Customer stories</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-y-4">
            <li>
              <h3 className="text-xl font-bold">Resources</h3>
            </li>
            <li>
              <p>Blog</p>
            </li>
            <li>
              <p>Guides & tutorials</p>
            </li>
            <li>
              <p>Help center</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-y-4">
            <li>
              <h3 className="text-xl font-bold">Company</h3>
            </li>
            <li>
              <p>About us</p>
            </li>
            <li>
              <p>Careers</p>
            </li>
            <li>
              <p>Media kit</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-y-4">
            <li>
              <h3 className="text-xl font-bold">Try It Today</h3>
            </li>
            <li>
              <p className="max-md:text-sm">
                Get started for free. Add your whole team as your needs grow.
              </p>
            </li>
            <li>
              <a href="/" className="bg-[#4F9CF9] py-4 px-10 rounded-xl max-md:py-2 max-md:px-6 max-md:text-sm">
                Try Whitepace free
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full h-px bg-[#dddddd]"></div>
        
        <div className="flex items-center justify-between mt-8 max-md:block">
          <ul className="text-white flex gap-x-8 max-md:block">
            <li>English</li>
            <li>Terms & privacy</li>
            <li>Security</li>
            <li>Status</li>
            <li>©2021 Whitepace LLC.</li>
          </ul>
          <ul className="flex items-center gap-x-6 text-white max-md:gap-x-2">
            <li className="md:hidden max-md:block text-yellow-300">Follow us:</li>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaTwitter />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
