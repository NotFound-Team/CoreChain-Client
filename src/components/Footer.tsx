// -- Next --
import Image from "next/image";

// -- React-icon --
import { FaFacebookF, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="text-[#E2E4E9] py-8">
      {/* What is the Project? */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-6">
          <div className="font-bold text-lg">
            What is Our HR Management Platform?
          </div>
          <p className="max-w-[363px]">
            We provide blockchain-based human resource management services,
            ensuring information security, optimizing management processes, and
            enhancing transparency.
          </p>

          {/* Compliance and Payment Services */}
          <ul className="flex items-center gap-x-4 mt-4">
            <li>
              <Image
                src={"/images/GDPR compliant - GDPR Copy 5.png"}
                alt="GDPR Compliant"
                width={66}
                height={100}
                style={{
                  height: "auto",
                }}
              />
            </li>
            <li>
              <Image
                src={"/images/norton-by-symantec-vector-logo 1.png"}
                alt="Norton Security"
                width={66}
                height={100}
                style={{
                  height: "auto",
                }}
              />
            </li>
            <li>
              <Image
                src={"/images/stripe-seeklogo.com 1.png"}
                alt="Stripe"
                width={66}
                height={100}
                style={{
                  height: "auto",
                }}
              />
            </li>
            <li>
              <Image
                src={"/images/paypal.png"}
                alt="PayPal"
                width={66}
                height={100}
                style={{
                  height: "auto",
                }}
              />
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div>
          <ul className="flex flex-wrap justify-between text-sm">
            <li className="mr-8">
              <h3 className="font-semibold mb-7">Products</h3>
              <ul className="flex flex-col gap-y-4">
                <li>Human Resource Management</li>
                <li>Blockchain Security</li>
                <li>Recruitment Features</li>
                <li>Analytics and Reporting</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Resource Section */}
        <div>
          <ul className="flex flex-wrap justify-between text-sm">
            <li className="mr-8">
              <h3 className="font-semibold mb-7">Resources</h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <a href="/user-guide">User Guide</a>
                </li>
                <li>
                  <a href="/technical-documentation">Technical Documentation</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-of-service">Terms of Service</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <ul className="flex flex-wrap justify-between text-sm">
            <li className="mr-8">
              <h3 className="font-semibold mb-7">Community</h3>
              <ul className="flex flex-col gap-y-4">
                <li>
                  <a href="/community-forum">Community Forum</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
                <li>
                  <a href="/support">Customer Support</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-[14px]">© 2025 HR Management Platform. Powered by 404Team</p>
        <ul className="flex items-center space-x-4">
          <li className="text-black text-xl w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </li>
          <li className="text-black text-xl w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
          <li className="text-black text-xl w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </li>
          <li className="text-black text-xl w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
