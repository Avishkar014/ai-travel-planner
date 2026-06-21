import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-10">
      <h1 className="text-5xl font-bold mb-4">
        Plan Smarter With AI
      </h1>

      <p className="text-lg mb-6">
        Generate personalized travel itineraries,
        hotel suggestions and budget plans instantly.
      </p>

      <Link href="/create-trip">
        <button className="bg-white text-cyan-600 px-6 py-3 rounded-xl font-semibold">
          Create Trip
        </button>
      </Link>
    </section>
  );
}