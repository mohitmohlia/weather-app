import { useRouter } from "next/router";
import { useState, FormEvent, useRef, useEffect } from "react";

const Form = ({
  searchedZip,
}: {
  searchedZip?: string | string[] | undefined;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [zip, setZip] = useState(searchedZip);
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (zip) {
      router.replace(`/weather/${zip}`);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex m-4 p-4 w-full justify-center lg:flex-row flex-col"
    >
      <input
        ref={inputRef}
        className="w-full rounded-lg text-zinc-50 text-4xl outline-none  bg-zinc-50 dark:bg-zinc-800 h-36 p-4"
        type="text"
        onChange={(e) => setZip(e.target.value)}
        value={zip}
        placeholder="Enter zip code"
      />

      <button
        className="text-2xl p-4  rounded-lg text-orange-600"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Form;
