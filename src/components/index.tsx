import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <div className="bg-white">
      <div
        className="bg-fixed bg-cover sm:bg-center custom-bg-shift"
        style={{ backgroundImage: "url('/hero/dog2.png')" }}
      >
        <div className="relative isolate pt-14 bg-slate-100 bg-opacity-50">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 "
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          <div className="mx-auto py-10 sm:py-10 lg:py-20">
            <div className="flex justify-center my-5 sm:mb-8 sm:flex sm:justify-center">
              <Image
                className="filter max-w-[250px] sm:max-w-[300px]"
                style={{
                  filter:
                    "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8)) drop-shadow(0px 0px 30px rgba(255, 255, 255, 1))",
                }}
                src="/logo.png"
                alt="Animal Adoption Network logo"
                width={300}
                height={150}
                priority
              />
            </div>
            <div className="text-center">
              <h1
                className=" w-100 p-1 text-4xl font-regular tracking-tight text-slate-100 sm:text-4xl"
                style={{
                  filter: "drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.8))",
                }}
              >
                Your new best friend is waiting for you!
              </h1>
              <p
                className="mt-6 text-lg leading-8 text-gray-600 max-w-[350px] text-center mx-auto"
                style={{
                  filter:
                    "drop-shadow(1px 1px 5px rgba(255, 255, 255, 1)) drop-shadow(1px 1px 8px rgba(255, 255, 255, 0.7)) ",
                }}
              >
                Search through many shelters and rescuers, filter your
                preferences and location.
              </p>
              <div className="mt-5 flex items-center flex-col justify-center gap-x-6">
                <Link
                  href="/search"
                  className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
                >
                  Search for Friend
                </Link>
                <Link
                  href="/shelters/register"
                  className="mt-3 text-sm font-semibold leading-6 text-gray-900 hover:text-violet-100"
                >
                  Register as a Shelter <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <hr className="mt-6 " />
            <div className="mt-6 flex items-center justify-center gap-x-6 ">
              <Link
                href="/adopters/register"
                className="rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-70"
              >
                Register
              </Link>
              <p className="text-rg leading-8 text-gray-600">or</p>
              <Link
                href="/login"
                className="rounded-md bg-gray-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
