import AdoptersDashboard from "@/components/adopters-dashboard";
import HeaderAdopters from "@/components/header-adopters";
// import Footer from "@/components/footer";

export default function About() {
  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-16">
        <div className=" mx-auto max-w-[800px] relative isolate pt-14 px-8">
          {/* Mission and Vision in two columns on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-semibold text-brown">Our Mission</h1>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                The Animal Adoption Network is a dedicated platform that
                connects loving animals with their forever homes. We believe
                that every animal deserves a chance to live a happy, healthy
                life. Our mission is to streamline the adoption process, making
                it easy for shelters and rescuers to post available animals and
                for adopters to find their perfect match.
              </p>
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-brown">Our Vision</h1>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                A world where all animals are respected, where humans either
                take care of them if they are urban or stray or do not interfere
                in their natural dynamics if they are wild. No abandoned,
                enslaved, nor instrumentalized anmals.
              </p>
            </div>
          </div>

          {/* Rest of the content in a single column */}
          <div className="mt-10">
            <h1 className="text-6xl font-semibold text-brown text-center">
              {`It's totally Free!`}
            </h1>
            <h1 className="mt-8 text-2xl font-semibold text-brown">
              How It Works
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our user-friendly platform allows adopters to search for animals
              based on various criteria, including location, size, species, age,
              and more. Shelters and rescuers can easily create profiles for
              their animals, providing detailed information and captivating
              photos.
            </p>
          </div>

          <div className="mt-10">
            <h1 className="text-2xl font-semibold text-brown">
              Why Choose Us?
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Free to Use: Our platform is completely free for both adopters and
              shelters. We believe that every animal deserves a loving home,
              regardless of financial circumstances.
              <br />
              <br />
              Verified Profiles: We prioritize the safety and well-being of both
              animals and adopters. All shelters and rescuers must submit legal
              documentation to verify their authenticity. Additionally, adopters
              must complete detailed forms that will be reviewed by shelters.
              <br />
              <br />
              Focus on Rescued Animals: We are committed to providing a safe and
              secure space for rescued animals. We do not allow breeders or
              profit-making activities.
              <br />
              <br />
              Flexible Adoption Fees: While our platform is free for adopters,
              shelters are empowered to set adoption fees to cover their
              expenses. This ensures that the animals receive the care and
              support they need.
              <br />
              <br />
              {`Join Us in Making a Difference: Whether you are looking to adopt a
              furry or feathered friend or a shelter looking for loving homes for your rescued
              animals, the Animal Adoption Network is here to assist you. Let's
              work together to create a world where every rescued animal has a happy and
              fulfilling life.`}
            </p>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
