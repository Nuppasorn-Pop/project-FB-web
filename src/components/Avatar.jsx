import profileImg from "../assets/services-2.jpg";
export default function Avatar({ src, size = 2.5 }) {
  return (
    <img
      src={src || profileImg}
      alt="user"
      style={{ width: `${size}rem`, height: `${size}rem` }}
      className="rounded-full"
    />
  );
}
