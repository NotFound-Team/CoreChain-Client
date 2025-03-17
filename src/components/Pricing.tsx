import { TiTick } from "react-icons/ti";

export default function Pricing() {
  return (
    <>
      <div className="relative">
        <div className="bg-[#00E5FF] text-center h-[300px] pt-10">
          <h2 className="text-white text-3xl font-bold mb-4">
            Simple. <span className="text-[#651FFF]">Fair pricing</span>.
          </h2>
          <p className="text-lg text-white">
            Pay for what you use. There is no minimum charge. Always know what you’ll pay.
          </p>
        </div>

        <div className="flex-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col items-center justify-center gap-y-4 text-center bg-white shadow-2xl w-[400px] p-10 rounded-3xl hover:scale-[1.1] hover:z-10 transition-all duration-300">
            <h3 className="text-[28px]">Storage</h3>
            <p className="max-w-[330px] text-[#838696]">
              Access a complete decentralized storage with simple, pay-as-you-go pricing
            </p>
            <div>
              <div className="text-[44px] font-semibold">$0.008</div>
              <div>per GB/month</div>
            </div>

            <div>
              <button className="bg-[#651FFF] text-white border-2 border-black font-semibold py-1 px-8 text-sm rounded-lg hover:bg-[#675886]">
                Comparision
              </button>
            </div>
            <ul className="flex flex-col items-start justify-center gap-y-2">
              <li className="flex">
                <div className="w-[20px] h-[20px] rounded-full bg-[#ECECFE] flex-center mr-2">
                  <TiTick />
                </div>
                <span className="text-sm">Everything you need to storage & share files</span>
              </li>
              <li className="flex">
                <div className="w-[20px] h-[20px] rounded-full bg-[#ECECFE] flex-center mr-2">
                  <TiTick />
                </div>
                <span className="text-sm">No fees for API requests or data retrievals</span>
              </li>
              <li className="flex">
                <div className="w-[20px] h-[20px] rounded-full bg-[#ECECFE] flex-center mr-2">
                  <TiTick />
                </div>
                <span className="text-sm">No setup fees, monthly fees, or hidden fees</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start justify-center gap-y-4 bg-[#651FFF] shadow-2xl w-[400px] p-10 rounded-3xl text-white hover:scale-[1.1] hover:z-10 transition-all duration-300">
            <h3 className="text-[28px]">Transfer</h3>
            <p>
              Pay only for what you use. There is no minimum charge. You pay for all bandwidth into and out of Deupload.
            </p>
            <div>
              <div>
                <button className="bg-white w-[85px] h-[25px] text-xs border-2 text-black font-semibold rounded-lg hover:bg-purple-100">
                  Inbound
                </button>
              </div>
              <div className="flex-center">
                <div className="text-[44px] mr-2">$0.006</div>
                <div>GB/month</div>
              </div>
            </div>
            <div>
              <div>
                <button className="bg-white w-[85px] h-[25px] text-xs border-2 text-black font-semibold rounded-lg hover:bg-purple-100">
                  Outbound
                </button>
              </div>
              <div className="flex-center">
                <div className="text-[44px] mr-2">$0.006</div>
                <div>GB/month</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center flex flex-col items-center justify-center mt-[500px] pb-10">
          <p className="text-lg text-[#5C5F6E] mb-4 max-w-[1000px]">
            Never pay for unused storage again. Never pay expensive seats for team member again. Only pay for what you
            use. Don’t get stalled by contracts, capacity planning, or price modeling.
          </p>
          <div className="flex justify-center space-x-8">
            <button className="bg-purple-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-purple-700">
              Pricing calculator
            </button>

            <button className="bg-transparent border-2 border-black text-black font-semibold py-2 px-10 rounded-lg hover:bg-purple-100">
              Comparision
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
