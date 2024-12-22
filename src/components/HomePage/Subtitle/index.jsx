import { BsAndroid2, BsApple } from "react-icons/bs";
import { IoLogoWindows } from "react-icons/io";

function Subitle() {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-gray-100 bg-[#043873] py-16">
        <div className="container mx-auto max-md:px-4">
          <div className="text-white flex-col gap-y-2.5 text-center flex-center">
            <h2 className="max-w-[500px] text-6xl font-bold mb-4 max-md:text-2xl">
              Try Whitepace today
            </h2>
            <p className="text-md mb-4 max-w-[350px] max-md:text-sm">
              Get started for free. Add your whole team as your needs grow.
            </p>
            <a
              href="/"
              className="bg-[#4F9CF9] py-4 px-10 rounded-xl max-md:py-2 max-md:px-6"
            >
              Try Whitepace free
            </a>
            <p>On a big team? Contact sales</p>
            <div className="flex-center gap-x-2.5">
              <a href="/" className="text-6xl max-md:text-4xl">
                <BsApple />
              </a>
              <a href="/" className="text-6xl max-md:text-4xl">
                <IoLogoWindows />
              </a>
              <a href="/" className="text-6xl max-md:text-4xl">
                <BsAndroid2 />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subitle;
