import { UserProfile } from "@/lib/mockData";

interface UserInfoProps {
  user: UserProfile;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#6f42c1] flex items-center justify-center text-white text-3xl font-bold mr-4">
          {user.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-1">{user.name}</h4>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <span className="px-2 py-1 bg-[#6f42c1] text-white text-sm font-medium rounded">
            {user.role}
          </span>
        </div>
      </div>
      <hr className="border-gray-200 my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
            Phone
          </label>
          <p className="text-gray-900">{user.phone || "Not provided"}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
            Organization
          </label>
          <p className="text-gray-900">{user.organization || "Not provided"}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
            Member Since
          </label>
          <p className="text-gray-900">
            {new Date(user.joinedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide block mb-1">
            User ID
          </label>
          <p className="text-gray-900">
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{user.id}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
