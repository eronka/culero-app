export enum NotificationType {
  CONNECTION = "CONNECTION",
  REVIEW = "REVIEW",
}

export type DbNotification = {
  type: NotificationType;
  body: string;
  title: string;
  extraData: any;
  createdAt: Date;
};
