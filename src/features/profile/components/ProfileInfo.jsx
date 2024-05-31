import Avatar from "../../../components/Avatar";
import useAuth from "../../../hooks/useAuth";

export default function ProfileInfo() {
  const { authUser } = useAuth();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-semibold">
        {authUser?.firstName} {authUser?.lastName}
      </h2>
      <span className="font-medium text-gray-500">2 friends</span>
      <div className="flex -space-x-2">
        <Avatar />
        <Avatar />
      </div>
    </div>
  );
}

// gap ติดลบไม่ได้ เลยใช้ -space-x แทน ให้รูปมาซ้อนกัน
