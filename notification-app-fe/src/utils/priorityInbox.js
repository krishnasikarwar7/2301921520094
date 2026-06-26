const PRIORITY_WEIGHTS = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

export function processPriorityInbox(notifications, limit = 10) {
  if (!Array.isArray(notifications)) return [];

  return [...notifications]
    .sort((a, b) => {
      const weightA = PRIORITY_WEIGHTS[a.Type] || 0;
      const weightB = PRIORITY_WEIGHTS[b.Type] || 0;
      
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, limit);
}