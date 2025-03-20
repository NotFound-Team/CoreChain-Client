// -- React-icon --
import { FaFreeCodeCamp, FaShieldAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdMoneyOff } from "react-icons/md";

export default function FeatureHighlights() {
  return (
    <section className="text-center py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Fast. Secure. Transparent HR Management.
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Our decentralized HR management platform offers enhanced security,
          better privacy, and fairer costs, ensuring smooth collaboration, data
          security, and transparency in all your HR processes.
        </p>
        <div className="flex justify-between space-x-8">
          <div className="bg-[#651FFF] text-white p-6 rounded-lg flex flex-col items-center justify-between gap-y-6">
            <div className="w-[60px] h-[60px] bg-white text-[#00B0FF] text-xl flex items-center justify-center rounded-full">
              <FaFreeCodeCamp />
            </div>
            <h3 className="text-xl font-semibold">Lightweight & Efficient</h3>
            <p>
              Our platform is designed to be lightweight, helping HR teams
              collaborate effectively by organizing, managing, and sharing
              employee data without delays or performance issues.
            </p>
            <a
              href="/features"
              className="text-blue-200 mt-4 flex items-center justify-center gap-x-2"
            >
              <span>Product features</span> <FaArrowRightLong />
            </a>
          </div>
          <div className="bg-[#651FFF] text-white p-6 rounded-lg flex flex-col items-center justify-between gap-y-6">
            <div className="w-[60px] h-[60px] bg-white text-[#00B0FF] text-xl flex items-center justify-center rounded-full">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold">Decentralized Security</h3>
            <p>
              By leveraging blockchain technology, we store HR data securely
              across a distributed network, eliminating the risks of centralized
              data breaches and ensuring privacy and trustworthiness.
            </p>
            <a
              href="/how-it-works"
              className="text-blue-200 mt-4 flex items-center justify-center gap-x-2"
            >
              <span>How it works</span> <FaArrowRightLong />
            </a>
          </div>
          <div className="bg-[#651FFF] text-white p-6 rounded-lg flex flex-col items-center justify-between gap-y-6">
            <div className="w-[60px] h-[60px] bg-white text-[#00B0FF] text-xl flex items-center justify-center rounded-full">
              <MdMoneyOff />
            </div>
            <h3 className="text-xl font-semibold">No Hidden Fees</h3>
            <p>
              With our pay-as-you-go model, HR departments only pay for the
              storage and services they actually use, eliminating monthly
              subscription fees and offering fairer pricing for all.
            </p>
            <a
              href="/pricing"
              className="text-blue-200 mt-4 flex items-center justify-center gap-x-2"
            >
              <span>Metered billing</span> <FaArrowRightLong />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
