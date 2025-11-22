export type StatusType = "online" | "offline" | "instavel";

let currentStatus: StatusType = "online";

export function getCurrentStatus() {
  return currentStatus;
}

export function updateStatus(newStatus: StatusType) {
  if (currentStatus === newStatus) return;
  currentStatus = newStatus;
  return currentStatus;
}
