import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import HeroImage from '@assets/images/hero-plants.png';
import ProductOfTheDayImage from '@assets/images/plant.png';
import SectionImage from '@assets/images/section-background.png';
import PlantImage from '@assets/images/Plant1.png';
import PlantingMaterialImage from '@assets/images/planting-material.png';
import ProtectiveImage from '@assets/images/protective-products.png';
import FertilizerImage from '@assets/images/fertilizer.png';
import ToolsImage from '@assets/images/tools.png';
import EquipmentImage from '@assets/images/equipment.png';
import PotsImage from '@assets/images/pots.png';
import DeliveryIcon from '@assets/icons/delivery.svg?react';
import LabelIcon from '@assets/icons/label.svg?react';
import LikeMessageIcon from '@assets/icons/like-message.svg?react';
import PlantIcon from '@assets/icons/plant.svg?react';
import { Button } from '@/components/ui/button';
import FrameIcon from '@assets/icons/frame.svg?react';
import ProductCard from '@/components/common/cards/ProductCard';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const categories = [
    {
      name: 'Planting material',
      image: PlantingMaterialImage,
      path: '/categories/planting-material',
    },
    {
      name: 'Protective products',
      image: ProtectiveImage,
      path: '/categories/protective-products',
    },
    {
      name: 'Fertilizer',
      image: FertilizerImage,
      path: '/categories/fertilizer',
    },
    { name: 'Tools', image: ToolsImage, path: '/categories/tools' },
    { name: 'Equipment', image: EquipmentImage, path: '/categories/equipment' },
    { name: 'Pots & Planters', image: PotsImage, path: '/categories/pots' },
  ];

  const reviews = [
    {
      text: 'Fast delivery and beautiful plants. Highly recommend Verdora!',
      name: 'Bill Afton',
      rating: '4.0/5',
      initials: 'BA',
    },
    {
      text: 'Excellent quality and friendly service. Very happy with my order.',
      name: 'Amily Grenshy',
      rating: '4.9/5',
      initials: 'AG',
    },
    {
      text: 'Everything arrived fresh and in perfect condition. Thank you!',
      name: 'Omar Kirik',
      rating: '4.5/5',
      initials: 'OK',
    },
    {
      text: 'Amazing selection of plants and gardening supplies. Love this shop!',
      name: 'Greg Harigton',
      rating: '4.9/5',
      initials: 'GH',
    },
    {
      text: 'The plant was packed carefully and looks wonderful at home.',
      name: 'Mia Brown',
      rating: '5.0/5',
      initials: 'MB',
    },
  ];

  return (
    <LayoutPage>
      <div className="mt-8 sm:mt-16 flex flex-col items-center gap-16 sm:gap-24 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <section className="flex flex-col items-center text-center w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6 w-full">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] sm:leading-[0.98]
                tracking-tight text-transparent
                bg-[url('@assets/images/text-background.avif')] bg-cover bg-center bg-clip-text
                font-sans max-w-3xl"
            >
              We're glad you found us. Now let's find your plant!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#4A5568] max-w-2xl">
              Your home deserves more than furniture and paint. It deserves life
              — real, breathing, growing life. Our collection brings together
              the most beautiful plants from around the world.
            </p>
            <Button asChild>
              <Link to="/sales">Start shopping</Link>
            </Button>
          </div>
          <div className="relative z-10 -mt-12 sm:-mt-24 max-w-3xl w-full pointer-events-none transition-transform hover:scale-[1.01] duration-500">
            <img
              src={HeroImage}
              alt="Hero Plants"
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        <section className="w-full bg-[#1E331B] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center text-white">
            <div className="flex flex-col items-center text-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <DeliveryIcon className="size-8 text-[#A8C89A]" />
              <p className="text-xs sm:text-sm font-medium leading-snug">
                Shipped Direct from the Nursery
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <LabelIcon className="size-8 text-[#A8C89A]" />
              <p className="text-xs sm:text-sm font-medium leading-snug">
                30 Day Happiness Guarantee
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <LikeMessageIcon className="size-8 text-[#A8C89A]" />
              <p className="text-xs sm:text-sm font-medium leading-snug">
                Expert Customer Support
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-3 rounded-2xl hover:bg-white/10 transition-colors duration-300">
              <PlantIcon className="size-8 text-[#A8C89A]" />
              <p className="text-xs sm:text-sm font-medium leading-snug">
                Care Instructions Provided
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-3">
            <Sparkles className="size-6 text-[#1E331B]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C]">
              Product of the day
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="relative aspect-[1.19] w-full max-w-[480px] p-4 sm:p-6">
                <FrameIcon className="pointer-events-none absolute inset-0 z-20 size-full" />
                <div className="relative z-10 size-full overflow-hidden rounded-[48px] sm:rounded-[70px] bg-[#50614A] flex items-center justify-center p-4">
                  <img
                    src={ProductOfTheDayImage}
                    alt="Spider plant"
                    className="size-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap shadow-lg">
                    <span className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xl sm:text-2xl font-bold text-white">
                      1609₴
                    </span>
                    <span className="rounded-lg bg-[#0C0C0C]/70 backdrop-blur-xs px-2.5 py-1 text-sm sm:text-base text-white line-through">
                      2000₴
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start gap-4">
              <span className="inline-flex items-center rounded-full bg-[#1E331B]/10 px-3 py-1 text-xs font-semibold text-[#1E331B]">
                Deal of the Day
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-[#0C0C0C]">
                Spider Plant
              </h3>
              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                A popular, low-maintenance houseplant with long, arching green
                leaves edged in creamy white. Spider plants produce baby
                plantlets that can be propagated easily. They thrive in bright,
                indirect light, tolerate occasional neglect, and help improve
                indoor air quality.
              </p>
              <Button asChild>
                <Link to="/categories">View product</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C]">
              Sales
            </h2>
            <Link
              to="/sales"
              className="group flex items-center gap-1.5 text-base sm:text-lg font-medium text-[#1E331B] hover:text-[#2A4726] transition-colors"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <ProductCard
                key={item}
                title="Rubber Plant"
                price={2000}
                newPrice={1609}
                imageSrc={ProductOfTheDayImage}
              />
            ))}
          </div>
        </section>

        <section className="w-full flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C0C0C]">
            Integrate in your house
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl shadow-xs group">
              <img
                src={SectionImage}
                alt="Cozy living room with houseplants"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <button
                type="button"
                className="absolute bottom-[22%] left-[23%] flex size-12 sm:size-14 items-center justify-center rounded-full bg-[#1E331B]/90 backdrop-blur-xs text-3xl font-light leading-none text-white hover:scale-110 hover:bg-[#1E331B] transition-all shadow-lg"
                aria-label="View plant details"
              >
                +
              </button>
              <button
                type="button"
                className="absolute bottom-[31%] left-[49%] flex size-12 sm:size-14 items-center justify-center rounded-full bg-[#1E331B]/90 backdrop-blur-xs text-3xl font-light leading-none text-white hover:scale-110 hover:bg-[#1E331B] transition-all shadow-lg"
                aria-label="View plant details"
              >
                +
              </button>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between items-center gap-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/80 p-6 text-center shadow-xs">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0C0C0C]">
                Rubber Plant
              </h3>
              <div className="relative z-10 w-full h-56 flex items-center justify-center">
                <img
                  src={PlantImage}
                  alt="Rubber Plant"
                  className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-xl bg-[#0C0C0C] px-5 py-2 text-xl font-bold text-white shadow-md">
                  150$
                </span>
              </div>
              <Button asChild>
                <Link to="/cart">Buy now</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 w-full">
          <h2 className="text-2xl sm:text-4xl font-semibold text-link-text">
            Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map(item => (
              <Link
                to={item.path}
                key={item.name}
                className="group flex flex-col justify-between items-center gap-3 rounded-2xl bg-white/70 hover:bg-white backdrop-blur-sm border border-white/80 p-4 h-48 text-center shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                <p className="text-sm sm:text-base font-semibold leading-tight text-link-text group-hover:text-[#1E331B] transition-colors">
                  {item.name}
                </p>
                <div className="h-28 w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-4xl font-semibold text-link-text">
              Find your perfect plant
            </h2>
            <Link
              to="/categories"
              className="text-2xl sm:text-4xl font-semibold text-link-text hover:text-[#2A4726] transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <ProductCard
                key={item}
                title="Rubber Plant"
                price={2000}
                imageSrc={ProductOfTheDayImage}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 w-full">
          <h2 className="text-2xl sm:text-4xl font-semibold text-link-text">
            Our reviews
          </h2>
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar"
            aria-label="Customer reviews"
          >
            {reviews.map(review => (
              <article
                key={review.name}
                className="flex min-w-[280px] sm:min-w-[340px] snap-start flex-col justify-between rounded-2xl bg-white/80 backdrop-blur-sm border border-white/80 p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <p className="text-sm sm:text-base leading-relaxed text-[#2C332D] mb-4">
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between gap-4 text-xs sm:text-sm text-[#1E331B] font-medium pt-2 border-t border-black/5">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D9E3D5] text-xs font-bold text-[#1E331B]">
                      {review.initials}
                    </span>
                    <span className="truncate">{review.name}</span>
                  </div>
                  <span className="flex items-center gap-1 shrink-0 bg-[#FFF8E7] px-2.5 py-1 rounded-full text-xs font-semibold text-[#B78103]">
                    <Star className="size-3.5 fill-[#FFC400] text-[#FFC400]" />
                    {review.rating}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </LayoutPage>
  );
};

export default Home;
