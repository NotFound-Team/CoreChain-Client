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
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1 z-10">
            <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300 mb-6 relative">
              <FaUserEdit />
            </div>
            <h3 className="font-semibold mb-4 text-xl">Create an account</h3>
            <p className="max-w-[300px] text-gray-600">
              Register and set up your company profile to start managing
              employees on a decentralized platform.
            </p>
          </div>

          {/* Connector 1 */}
          <div className="hidden lg:flex items-center justify-center pt-8 w-[100px]">
             <div className="border-t-2 border-dashed border-gray-300 w-full mb-12"></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1 z-10">
            <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300 mb-6">
              <SiGoogleauthenticator />
            </div>
            <h3 className="font-semibold mb-4 text-xl">Store & verify data</h3>
            <p className="max-w-[300px] text-gray-600">
              All HR data is encrypted and stored on the blockchain, ensuring
              security and transparency.
            </p>
          </div>

          {/* Connector 2 */}
          <div className="hidden lg:flex items-center justify-center pt-8 w-[100px]">
             <div className="border-t-2 border-dashed border-gray-300 w-full mb-12"></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center flex-1 z-10">
            <div className="text-2xl text-white w-[70px] h-[70px] rounded-full bg-[#651FFF] flex items-center justify-center hover:bg-[#7C4DFF] hover:shadow-lg hover:-translate-y-2 transition-all duration-300 mb-6">
              <IoMdShare />
            </div>
            <h3 className="font-semibold mb-4 text-xl">Share & manage</h3>
            <p className="max-w-[300px] text-gray-600">
              Securely share employee information, allowing employees to
              control their personal data flexibly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
