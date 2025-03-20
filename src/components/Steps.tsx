// -- React-icon
import { FaUserEdit } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { RxBorderDashed } from "react-icons/rx";
import { SiGoogleauthenticator } from "react-icons/si";

export default function Steps() {
  return (
    <section className="bg-white py-12 text-center">
      <div className="container mx-auto w-full max-sm:px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How it works?</h2>
        <p className="text-lg text-gray-600 mb-12">
          We help businesses manage human resources securely, transparently, and
          efficiently using blockchain technology. The process is simple in 3
          steps:
        </p>
        <div className="flex items-center justify-center gap-x-14 mb-8">
          <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <FaUserEdit />
          </div>
          <ul className="flex items-center justify-center gap-x-2">
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
          </ul>
          <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <SiGoogleauthenticator />
          </div>
          <ul className="flex items-center justify-center gap-x-2">
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
            <li>
              <RxBorderDashed />
            </li>
          </ul>
          <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
            <IoMdShare />
          </div>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-x-4">
            <li>
              <h3 className="font-semibold mb-4">Create an account</h3>
              <p className="max-w-[327px]">
                Register and set up your company profile to start managing
                employees on a decentralized platform.
              </p>
            </li>
            <li>
              <h3 className="font-semibold mb-4">
                Store & verify employee data
              </h3>
              <p className="max-w-[327px]">
                All HR data is encrypted and stored on the blockchain, ensuring
                security and transparency, eliminating fraud and errors.
              </p>
            </li>
            <li>
              <h3 className="font-semibold mb-4">
                Share & manage records easily
              </h3>
              <p className="max-w-[327px]">
                Securely share employee information, allowing employees to
                control their personal data and grant access flexibly.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
