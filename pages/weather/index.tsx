import Form from "@/component/Form";
import Image from "next/image";
const Weather = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-[50%]">
          <h1 className="lg:text-8xl md:text-8xl sm:text-6xl text-5xl  flex flex-col p-4">
            Weather Application{" "}
            <span className="lg:text-2xl md:text-xl sm:text-lg text-lg p-1 text-start">
              powered by{" "}
              <span className="text-orange-600"> OpenWeatherAPI</span>
            </span>
          </h1>
          <Form />
        </div>
      </div>
      <div className="text-3xl -mt-20 flex justify-center font-light">
        Deployed on{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert ml-4"
          width={100}
          height={24}
          priority
        />
      </div>
    </>
  );
};

export default Weather;
