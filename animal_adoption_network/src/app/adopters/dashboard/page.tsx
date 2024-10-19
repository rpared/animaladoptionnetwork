"use client";

import AdoptersDashboard from "@/components/adopters-dashboard";
import HeaderAdopters from "@/components/header-adopters";

export default function AdoptersSearch() {
  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-16 text-gray-600">
        <div className="mx-auto max-w-[800px] relative isolate pt-14 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Adopter Dashboard
          </h1>
        </div>
      </main>
    </>
  );
}
