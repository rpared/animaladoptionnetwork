import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-6 mx-auto max-w-[600px] bg-white text-center text-gray-600 px-5">
      <Link
      href="https://roger.costra.ec"
      target="_blank"
      >
      <p className="flex flex-col items-center gap-2 hover:underline hover:underline-offset-4">
        &copy; {new Date().getFullYear()} Roger Paredes
      </p>
      </Link>
      <p className=" mt-2 mb-6 text-sm">
        All animals listed are rescued, hosted by certified shelters or
        rescuers. No selling, breeders, nor profit intentions will be tolerated,
        please denounce any suspicious activity. Keep in mind that some shelters
        ask for an adoption fee to cover expenses.
      </p>
    </footer>
  );
}
