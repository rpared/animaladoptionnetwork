import HeaderAdopters from "@/components/header-adopters";
import AdoptersDashboard from "@/components/adopters-dashboard";

export default function AdoptionRequests() {
  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-2 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-6 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Adoption Requests
          </h1>
        </div>
      </main>
    </>
  );
}
