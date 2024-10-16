import Header from "@/components/header";
import Link from "next/link";
export default function Shelters() {
  return (
    <>
      <Header />
      <main className="bg-white my-16 text-gray-600">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl font-semibold text-brown text-center">
            Become a Partner Shelter
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Join our network of compassionate shelters and rescuers and help us
            find loving homes for rescued animals. <br />
            Breeders and profit are not allowed, any attempt will result in
            permanent banning.
          </p>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">
              Why Partner with Us?
            </h2>
            <ul className="mt-4 list-disc list-inside">
              <li>
                <strong>Streamline your adoption process:</strong> Our platform
                provides a centralized hub for managing your animals and
                adoption requests, saving you time and effort.
              </li>
              <li>
                <strong>Expand your reach:</strong> Connect with a wider
                audience of potential adopters who are actively searching for
                their perfect match.
              </li>
              <li>
                <strong>Showcase your shelter mission:</strong> Highlight your
                dedication to animal welfare and the incredible work you do.
              </li>
              <li>
                <strong>Benefit from our support:</strong> We offer resources
                and guidance to help you navigate the adoption process and
                ensure the best possible outcomes for your animals.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">How It Works</h2>
            <ul className="mt-4 list-disc list-inside">
              <li>
                <strong>Create profiles for your animals:</strong> Showcase
                their unique personalities, needs, and adoption stories.
              </li>
              <li>
                <strong>Manage adoption requests:</strong> Easily communicate
                with potential adopters and coordinate the adoption process.
              </li>
              <li>
                <strong>Promote your events and initiatives:</strong> Share
                information about upcoming fundraisers, adoption days, and other
                activities.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-brown">
              Join Our Community
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Become part of a growing network of dedicated shelters and animal
              lovers. Together, we can make a positive impact on the lives of
              countless rescued animals. <br />
              Oh, and did we not mention it is entirely <b>free</b>? Well, it
              is!
            </p>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/shelters/register"
              className="rounded-md bg-violet-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-70"
            >
              Register Now
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
