import Form from "@/component/Form";
import moment from "moment";
import { convertUnixToDate } from "../../utils/convertUnixToDate";
import { useRouter } from "next/router";
import Icon from "../../utils/icons";
import Image from "next/image";
import { InferGetServerSidePropsType } from "next/types";
const Card = ({ data }: { data: any }) => {
  const sunrise = convertUnixToDate(data.city.sunrise);
  const sunset = convertUnixToDate(data.city.sunset);
  const temp =
    data.list.reduce((acc: any, el: any) => acc + el.main.temp, 0) /
    data.list.length;
  console.log(data);
  return (
    <div className="bg-zinc-800 h-96 w-96 rounded-xl p-4 flex flex-col justify-evenly">
      <div className="heading flex items-baseline p-3">
        <h2 className="text-5xl font-semibold">{data.city.name},</h2>
        <h2 className="text-xl font-medium ml-2">{data.city.country}</h2>
      </div>
      <h3 className="text-4xl pl-3 text-orange-600">{temp.toFixed(0)}° F</h3>
      <div className="text-2xl pl-3 mt-2">
        <div className="flex items-center">
          <Image src="/sunrise.svg" height={50} width={50} alt="sunrise" />
          <h1 className="ml-4">{sunrise}</h1>
        </div>
        <div className="flex items-center">
          <Image src="/sunset.svg" height={50} width={50} alt="sunset" />
          <h1 className="ml-4">{sunset}</h1>
        </div>
        <h1 className="mt-4">Total Population : {data.city.population}</h1>
      </div>
    </div>
  );
};
function WeatherZip({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const zip = router.query.zip;
  return (
    <div className=" w-full flex flex-col justify-center items-center h-screen">
      <Form searchedZip={zip} />
      <div className="flex h-[90vh] w-full justify-evenly">
        {data.cod === "404" && (
          <div className="flex justify-center items-center">
            <div className="text-zinc-600 text-5xl flex">
              <Image
                className="mx-4"
                src="/notFound.svg"
                height={60}
                width={60}
                alt="not found"
              />
              <span>Zip not found</span>
            </div>
          </div>
        )}
        {data.cod === "200" && (
          <div className="flex w-full lg:flex-row  flex-col">
            <div className="flex-[0.5] flex items-center flex-col justify-evenly">
              <Card data={data} />
              <h1>
                Powered by{" "}
                <span className="text-orange-600">OpenWeatherAPI</span>
              </h1>
            </div>

            <div className="flex flex-[1] w-full overflow-auto flex-col">
              <div className="text-6xl my-8">
                3 hour forecast for the next 5 days.
              </div>
              <ul className="flex flex-col py-12 w-full overflow-auto">
                {data.list.map((item: any) => (
                  <li key={item.dt} className="p-8 min-w-[200px] border-b-2">
                    <div className="flex justify-evenly">
                      <div className="text-2xl flex-1 p-4">
                        {moment(item.dt_txt).calendar()}
                      </div>

                      <div className="text-2xl flex-1 p-4 flex items-center">
                        <div className="capitalize">
                          {item.weather[0].description}
                        </div>
                      </div>
                      <Image
                        height={50}
                        width={50}
                        src={Icon[item.weather[0].icon]}
                        alt="weather image"
                        className="ml-4"
                      />
                      {/* {item.weather[0].icon} */}
                      <div className="text-4xl flex-1 p-4 text-orange-600">
                        {item.main.temp} °F
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherZip;

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { zip } = params;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
