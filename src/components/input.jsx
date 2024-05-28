export default function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <input
        className={`w-full px-3 py-1.5 border rounded-md mt-3 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        }`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error ? <small className="text-red-500">{error}</small> : null}
    </>
  );
}
