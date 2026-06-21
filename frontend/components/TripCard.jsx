import Card from "./Card";

export default function TripCard({
  destination,
  days,
  budget,
}) {
  return (
    <Card>
      <h3 className="text-xl font-bold text-slate-800">
        {destination}
      </h3>

      <p className="text-slate-500 mt-2">
        {days} Days
      </p>

      <p className="text-slate-500">
        {budget} Budget
      </p>

      <button className="mt-4 text-cyan-600 font-semibold">
        View Trip →
      </button>
    </Card>
  );
}