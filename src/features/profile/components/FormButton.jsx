export default function FormButton({ children, onClick }) {
  return (
    <div
      className="px-2.5 py-1.5 rounded-md text-blue-500 text-sm hover:bg-gray-100"
      role="button"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
