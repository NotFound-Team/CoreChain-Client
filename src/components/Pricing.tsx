// -- Next --
import { TiTick } from "react-icons/ti";

export default function Pricing() {
  return (
    <>
      <div className="relative">
        <div className="bg-[var(--color-accent)] text-center pb-40 pt-16 px-4">
          <h2 className="text-white text-3xl font-bold mb-4">
            Simple. <span className="text-[var(--color-primary)]">Fair pricing</span>.
          </h2>
          <p className="text-lg text-white">
            Pay for what you use. There is no minimum charge. Always know what you&apos;ll pay.
          </p>
        </div>

        <div className="container mx-auto px-4 -mt-32">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="card flex flex-col items-center justify-center gap-y-4 text-center bg-[var(--bg-paper)] w-full max-w-[400px] p-10 rounded-[var(--radius-lg)] shadow-lg hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-[28px] text-[var(--text-primary)]">Storage</h3>
              <p className="max-w-[330px] text-[var(--text-secondary)]">
                Access a complete decentralized storage with simple, pay-as-you-go pricing
              </p>
              <div>
                <div className="text-[44px] font-semibold text-[var(--text-primary)]">$0.008</div>
                <div className="text-[var(--text-secondary)]">per GB/month</div>
              </div>

              <div>
                <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white border-2 border-transparent font-semibold py-2 px-8 text-sm rounded-[var(--radius-sm)] transition-all duration-300">
                  Comparision
                </button>
              </div>
              <ul className="flex flex-col items-start justify-center gap-y-2">
                <li className="flex">
                  <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-primary)]/10 flex-center mr-2 text-[var(--color-primary)]">
                    <TiTick />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">Everything you need to storage & share files</span>
                </li>
                <li className="flex">
                  <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-primary)]/10 flex-center mr-2 text-[var(--color-primary)]">
                    <TiTick />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">No fees for API requests or data retrievals</span>
                </li>
                <li className="flex">
                  <div className="w-[20px] h-[20px] rounded-full bg-[var(--color-primary)]/10 flex-center mr-2 text-[var(--color-primary)]">
                    <TiTick />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)]">No setup fees, monthly fees, or hidden fees</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start justify-center gap-y-4 bg-[var(--color-primary)] shadow-[var(--shadow-xl)] w-full max-w-[400px] p-10 rounded-[var(--radius-lg)] text-white hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-[28px]">Transfer</h3>
              <p>
                Pay only for what you use. There is no minimum charge. You pay for all bandwidth into and out of Deupload.
              </p>
              <div className="w-full">
                <div>
                  <button className="bg-white w-[85px] h-[25px] text-xs border-2 text-[var(--text-primary)] font-semibold rounded-[var(--radius-sm)] hover:bg-gray-100 transition-colors">
                    Inbound
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="text-[44px] mr-2">$0.006</div>
                  <div>GB/month</div>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <button className="bg-white w-[85px] h-[25px] text-xs border-2 text-[var(--text-primary)] font-semibold rounded-[var(--radius-sm)] hover:bg-gray-100 transition-colors">
                    Outbound
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="text-[44px] mr-2">$0.006</div>
                  <div>GB/month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center flex flex-col items-center justify-center mt-12 pb-10 px-4">
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-[800px]">
            Never pay for unused storage again. Never pay expensive seats for team member again. Only pay for what you
            use. Don&apos;t get stalled by contracts, capacity planning, or price modeling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold py-2 px-8 rounded-[var(--radius-sm)] transition-all duration-300">
              Pricing calculator
            </button>

            <button className="bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white font-semibold py-2 px-10 rounded-[var(--radius-sm)] transition-all duration-300">
              Comparision
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

