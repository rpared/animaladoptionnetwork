import Header from "@/components/header";
import Link from "next/link";
export default function Adopters() {
  return (
    <>
      <Header />
      <main className="bg-white my-16 text-gray-600">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl font-semibold text-brown text-center">
            Find Your New Best Friend
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Ready to adopt a loving companion? Our platform connects you with a
            variety of adorable animals seeking their forever homes.
          </p>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">How It Works</h2>
            <ul className="mt-4 list-disc list-inside">
              <li>
                <strong>Create an account:</strong> Sign up for free to start
                your search.
              </li>
              <li>
                <strong>Browse available animals:</strong> Discover a wide range
                of dogs, cats, and other pets.
              </li>
              <li>
                <strong>Contact shelters:</strong> Reach out to shelters
                directly to learn more about the animals you are interested in.
              </li>
              <li>
                <strong>Submit an adoption application:</strong> Complete a
                simple online form to express your interest.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">
              What to Expect
            </h2>
            <ul className="mt-4 list-disc list-inside">
              <li>
                <strong>Variety of options:</strong> Find animals of all ages,
                breeds, and temperaments.
              </li>
              <li>
                <strong>Detailed profiles:</strong> Learn about their
                personality, history, and needs.
              </li>
              <li>
                <strong>Safe and secure adoption process:</strong> We prioritize
                the well-being of both animals and adopters.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">
              Ready to Adopt?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Start your journey to finding your best friend today!
            </p>
            <div className="mt-10 text-center">
              <Link
                href="/adopters/register"
                className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
