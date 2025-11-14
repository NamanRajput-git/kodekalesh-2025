interface ActivityItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert":
        return "🔔";
      case "transaction":
        return "💳";
      case "resolution":
        return "✅";
      default:
        return "📋";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h5 className="text-lg font-semibold">Activity Feed</h5>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <span className="text-2xl mr-3">{getActivityIcon(activity.type)}</span>
              <div className="flex-grow">
                <p className="text-sm text-gray-700 mb-1">{activity.message}</p>
                <small className="text-xs text-gray-500">{formatDate(activity.timestamp)}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
