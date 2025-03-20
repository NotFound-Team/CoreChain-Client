// -- Next --
import Image from "next/image";

export default function PlatformIntro() {
  return (
    <section className="text-center py-16 bg-blue-50">
      <div className="container mx-auto w-full max-sm:px-4">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Secure and Transparent HR Management with Blockchain
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our decentralized human resource management platform ensures secure
            storage and sharing of employee data, enhances collaboration, and
            improves transparency—without the need for third-party
            subscriptions.
          </p>
          <div className="flex justify-center space-x-8">
            <button className="bg-purple-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-purple-700">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-black text-black font-semibold py-2 px-10 rounded-lg hover:bg-purple-100">
              Pricing
            </button>
          </div>
        </div>

        {/* Image section */}
        <div className="w-full flex items-center justify-center">
          <Image
            src={"/images/deupoad-hero-screen 1.png"}
            alt="HR platform dashboard"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "70%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}
