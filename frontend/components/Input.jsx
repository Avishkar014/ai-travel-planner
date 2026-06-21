export default function Input({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="
      w-full
      px-4
      py-3
      rounded-xl
      border
      border-slate-300
      bg-white
      text-slate-900
      placeholder:text-slate-400
      focus:outline-none
      focus:ring-2
      focus:ring-cyan-500
      "
    />
  );
}