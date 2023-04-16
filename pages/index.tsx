import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="lg:text-8xl md:text-8xl sm:text-6xl text-5xl  flex flex-col p-4">
        Weather Application{" "}
        <span className="lg:text-2xl md:text-xl sm:text-lg text-lg p-1 text-start">
          powered by <span className="text-orange-600"> OpenWeatherAPI</span>
        </span>
      </h1>
      <button
        className="p-4 text-3xl hover:border-2 border-orange-600 rounded-lg"
        onClick={() => router.push("/weather")}
      >
        Click to continue
      </button>
    </main>
  );
}
