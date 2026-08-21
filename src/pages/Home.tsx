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
import ProductCard from '@/components/ui/ProductCard';

export const Home = () => {
  const categories = [
    { name: 'Planting material', image: PlantingMaterialImage },
    { name: 'Protective products', image: ProtectiveImage },
    { name: 'Fertilizer', image: FertilizerImage },
    { name: 'Tools', image: ToolsImage },
    { name: 'Equipment', image: EquipmentImage },
    { name: 'Pots & Planters', image: PotsImage },
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
      <div className="mt-[108px] flex flex-col items-center justify-between gap-[64px] w-full">
        <div className="flex flex-col items-center justify-between gap-[20px]">
          <div className="flex flex-col gap-[24px] w-[52rem]">
            <h1
              className="text-center text-7xl font-bold leading-[0.95]
                tracking-[-0.05em] text-transparent
                bg-[url('@assets/images/text-background.avif')] bg-cover bg-center bg-clip-text
                font-sans"
            >
              We're glad you found us.
              <br />
              Now let's find your plant!
            </h1>
            <p className="text-center text-[20px] leading-[1.5] text-[#4A4A4A] ">
              Your home deserves more than furniture and paint. It deserves life
              — real, breathing, growing life. Our collection brings together
              the most beautiful plants from around the world, chosen for their
              form, their character, and the way they make a space feel whole.
            </p>
            <Button className="self-center w-32 bg-[#1E331B] text-[#FFF] text-xs hover:bg-[#1E331B]/80">
              Start shopping
            </Button>
          </div>
          <div className="relative z-10 -mt-[116px]">
            <img
              src={HeroImage}
              alt="Hero Plants"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex gap-[110px] bg-[#1E331B] opacity-72 w-full justify-center py-[12px]">
          <div className="flex flex-col jcontent-center items-center gap-[8px]">
            <DeliveryIcon className="size-8" />
            <p className="text-center text-[16px] leading-[1.5] text-[#FFF]">
              Shipped Direct from the Nursery
            </p>
          </div>
          <div className="flex flex-col jcontent-center items-center gap-[8px]">
            <LabelIcon className="size-8" />
            <p className="text-center text-[16px] leading-[1.5] text-[#FFF]">
              30 Day Happiness Guarantee
            </p>
          </div>
          <div className="flex flex-col jcontent-center items-center gap-[8px]">
            <LikeMessageIcon className="size-8" />
            <p className="text-center text-[16px] leading-[1.5] text-[#FFF]">
              Expert Customer Support
            </p>
          </div>
          <div className="flex flex-col jcontent-center items-center gap-[8px]">
            <PlantIcon className="size-8" />
            <p className="text-center text-[16px] leading-[1.5] text-[#FFF]">
              Care Instructions Provided
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-[62rem]">
          <h1 className="text-3xl font-bold">Product of the day</h1>
          <div className="flex gap-[24px]">
            <div>
              <div className="relative aspect-[1.19] w-[500px] px-[36px] py-[32px]">
                <FrameIcon className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

                <div className="relative z-10 h-full overflow-hidden rounded-[70px] bg-[#50614A]">
                  <img
                    src={ProductOfTheDayImage}
                    alt="Spider plant in a pot"
                    className="absolute inset-0 h-full w-full object-contain p-4"
                  />
                  <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap">
                    <span className="block rounded-[8px] bg-red-600 px-3 py-1 text-2xl font-semibold text-white">
                      1609₴
                    </span>
                    <span className="absolute ml-1 left-full rounded-[5px] bg-[#0C0C0C] opacity-56 px-2 text-lg text-white line-through">
                      2000₴
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px] justify-center">
              <h2 className="text-2xl font-bold">Spider Plant</h2>
              <p className="text-[16px] font-sans font-normal leading-[1.5] tracking-normal text-[#000]">
                A popular, low-maintenance houseplant with long, arching green
                leaves edged in creamy white. Spider plants produce baby
                plantlets that can be propagated easily. They thrive in bright,
                indirect light, tolerate occasional neglect, and help improve
                indoor air quality, making them an excellent choice for homes
                and offices.
              </p>
              <Button className="w-32 bg-[#1E331B] text-[#FFF] text-xs hover:bg-[#1E331B]/80">
                View product
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[24px] w-[62rem]">
          <div className="flex items-center justify-between gap-[24px]">
            <h1 className="text-3xl font-bold">Sales</h1>
            <span className="text-[20px] font-sans font-normal leading-[1.5] text-[#000]">
              View all
            </span>
          </div>

          {/* Product cards would go here */}
          <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
        <div className="w-[62rem]">
          <h2 className="mb-8 text-3xl font-bold text-[#0C0C0C]">
            Integrate in your house
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2.46fr)_minmax(320px,1fr)]">
            <div className="relative aspect-[1.62] overflow-hidden rounded-2xl">
              <img
                src={SectionImage}
                alt="Cozy living room with houseplants"
                className="size-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-[22%] left-[23%] flex size-16 items-center justify-center rounded-full bg-[#1E331B] text-4xl font-light leading-none text-white"
                aria-label="View plant details"
              >
                +
              </button>
              <button
                type="button"
                className="absolute bottom-[31%] left-[49%] flex size-16 items-center justify-center rounded-full bg-[#1E331B] text-4xl font-light leading-none text-white"
                aria-label="View plant details"
              >
                +
              </button>
            </div>
            <div className="flex flex-col justify-center gap-[24px] min-h-[430px] rounded-[16px] bg-[#FBFBFB] text-center">
              <h3 className="mt-[24px] text-[24px] font-sans font-medium leading-[1.25] text-[#0C0C0C]">
                Rubber Plant
              </h3>
              <div className="relative z-10  h-[62%]">
                <img
                  src={PlantImage}
                  alt="Rubber Plant"
                  className="absolute h-full w-full object-contain"
                />
                <span className="absolute bottom-[37px] left-1/2 z-10 -translate-x-1/2 rounded-xl bg-[#0C0C0C] px-5 py-3 text-[28px] leading-none text-white">
                  150$
                </span>
              </div>
              <div className="flex justify-center mx-[24px]">
                <Button className="w-full rounded-[16px] bg-[#1E331B] text-[20px] font-normal text-white hover:bg-[#1E331B]/80">
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-[62rem]">
          <h1 className="mb-8 text-3xl font-bold text-[#0C0C0C]">Categories</h1>
          <div className="grid grid-cols-3 gap-[8px]">
            {categories.map(item => (
              <div
                key={item.name}
                className="flex flex-col justify-center items-center gap-[16px] rounded-[16px] bg-[#FBFBFB] h-[14rem] p-[24px] text-center overflow-hidden"
              >
                <p className="text-[20px] font-sans font-medium leading-[1.25] text-[#0C0C0C]">
                  {item.name}
                </p>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[80%] w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-[62rem]">
          <div className="flex items-center justify-between gap-[24px]">
            <h1 className="text-3xl font-bold">Find your perfect plant</h1>
            <span className="text-[20px] font-sans font-normal leading-[1.5] text-[#000]">
              View all
            </span>
          </div>
          <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <ProductCard
                key={item}
                title="Rubber Plant"
                price={2000}
                imageSrc={ProductOfTheDayImage}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-[62rem]">
          <h1 className="mb-8 text-3xl font-bold text-[#0C0C0C]">
            Our reviews
          </h1>
          <div
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Customer reviews"
          >
            {reviews.map(review => (
              <article
                key={review.name}
                className="flex h-[172px] min-w-[320px] snap-start flex-col justify-between rounded-[16px] bg-[#F1F1F1] p-[24px]"
              >
                <p className="text-[16px] leading-[1.45] text-[#1E331B]">
                  {review.text}
                </p>
                <div className="flex items-center justify-between gap-4 text-[13px] text-[#1E331B]">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#D9E3D5] text-[10px] font-semibold text-[#1E331B]">
                      {review.initials}
                    </span>
                    <span className="truncate">{review.name}</span>
                  </div>
                  <span className="shrink-0">
                    <span className="mr-1 text-[#FFC400]">★</span>
                    {review.rating}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Home;
