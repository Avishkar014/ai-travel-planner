<motion.div
  key={trip._id}
  whileHover={{
    y: -8,
    scale: 1.02,
  }}
  className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
>
  <div className="h-40 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-5" />

  <h4 className="text-xl font-bold">
    {trip.destination}
  </h4>

  <p className="text-slate-500 mt-2">
    {trip.durationDays} Days • {trip.budgetTier}
  </p>

  <p className="text-sm text-slate-400 mt-2">
    {new Date(trip.createdAt).toLocaleDateString()}
  </p>

  <Link href={`/trips/${trip._id}`}>
    <button className="mt-5 text-cyan-600 font-semibold hover:translate-x-1 transition">
      View Trip →
    </button>
  </Link>
</motion.div>