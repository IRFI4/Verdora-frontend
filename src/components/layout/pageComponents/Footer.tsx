import { useState } from 'react';
import Logo from '@components/common/Logo';
import LinkComponent from '@components/common/Link';
import { Button } from '@components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import footerCircleImg from '@assets/images/footer-circle.png';
import TextField from '@components/common/forms/TextField';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative w-full font-sans overflow-hidden">
      <div className="hidden md:flex relative pt-12 flex-col items-center justify-center">
        <div className="relative w-full max-w-170 aspect-square items-center justify-center z-10 px-4">
          <img
            src={footerCircleImg}
            alt="Discounts flower wheel"
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 max-w-[320px] mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1B3022] leading-tight">
              Don’t miss our discounts!
            </h2>

            {subscribed ? (
              <div className="bg-white/90 backdrop-blur rounded-full py-3 px-6 text-sm font-medium text-[#203622] shadow-sm mt-4">
                Thank you for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-2.5 mt-4"
              >
                <TextField
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={setEmail}
                />
                <Button variant="default" disabled={!email.trim()}>
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-95 pointer-events-none z-0 flex items-start">
          <div className="flex-1 h-full bg-[#C3E3BD]" />

          <div className="w-185 shrink-0 h-full overflow-hidden">
            <svg
              viewBox="0 0 740 380"
              className="w-full h-full block text-[#C3E3BD]"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 0 
             A 370 370 0 0 0 740 0 
             L 740 380 
             L 0 380 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="flex-1 h-full bg-[#C3E3BD]" />
        </div>
      </div>
      <div className="bg-[#C3E3BD] pt-0 pb-16 px-6 md:px-12 lg:px-20 text-[#19271B]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start pt-2">
          <div className="flex flex-col items-start gap-3">
            <Logo fontSize="text-3xl" className="text-[#102012]" />
            <p className="text-sm text-[#2D3E2F] leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet consectetur. Mattis id amet at amet
              nibh odio feugiat.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <h3 className="text-base font-semibold text-[#102012]">
              Resources
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-[#2D3E2F]">
              <li>
                <LinkComponent
                  text="About Us"
                  to="/about"
                  className="text-sm font-normal text-[#2D3E2F] hover:text-[#102012] no-underline hover:underline"
                />
              </li>
              <li>
                <LinkComponent
                  text="Delivery"
                  to="/delivery"
                  className="text-sm font-normal text-[#2D3E2F] hover:text-[#102012] no-underline hover:underline"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3">
            <h3 className="text-base font-semibold text-[#102012]">
              Contact us
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-[#2D3E2F]">
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#102012]" />
                <a
                  href="mailto:vedora@gmail.com"
                  className="hover:underline transition-colors"
                >
                  vedora@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#102012]" />
                <a
                  href="tel:+380984769000"
                  className="hover:underline transition-colors"
                >
                  +380984769000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-[#102012]" />
                <span>New Scotland Avenue St. 567, Albany</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
