// -- React-icon --
import { FaFreeCodeCamp, FaShieldAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdMoneyOff } from "react-icons/md";

export default function FeatureHighlights() {
  return (
    <section className="text-center py-16 bg-[var(--color-primary)]/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">
          Fast. Secure. Transparent HR Management.
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-12">
          Our decentralized HR management platform offers enhanced security,
          better privacy, and fairer costs, ensuring smooth collaboration, data
          security, and transparency in all your HR processes.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--color-primary)] text-white p-6 rounded-[var(--radius-md)] flex flex-col items-center justify-between gap-y-6 shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-[60px] h-[60px] bg-white text-[var(--color-accent)] text-xl flex items-center justify-center rounded-full">
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
              className="text-[var(--color-accent-light)] hover:text-white mt-4 flex items-center justify-center gap-x-2 transition-colors"
            >
              <span>Product features</span> <FaArrowRightLong />
            </a>
          </div>
          <div className="bg-[var(--color-primary)] text-white p-6 rounded-[var(--radius-md)] flex flex-col items-center justify-between gap-y-6 shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-[60px] h-[60px] bg-white text-[var(--color-accent)] text-xl flex items-center justify-center rounded-full">
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
              className="text-[var(--color-accent-light)] hover:text-white mt-4 flex items-center justify-center gap-x-2 transition-colors"
            >
              <span>How it works</span> <FaArrowRightLong />
            </a>
          </div>
          <div className="bg-[var(--color-primary)] text-white p-6 rounded-[var(--radius-md)] flex flex-col items-center justify-between gap-y-6 shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-[60px] h-[60px] bg-white text-[var(--color-accent)] text-xl flex items-center justify-center rounded-full">
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
              className="text-[var(--color-accent-light)] hover:text-white mt-4 flex items-center justify-center gap-x-2 transition-colors"
            >
              <span>Metered billing</span> <FaArrowRightLong />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

