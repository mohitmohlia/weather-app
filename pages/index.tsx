import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-8xl flex flex-col p-4">
        Weather Application{" "}
        <span className="text-2xl p-1 text-start">
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
