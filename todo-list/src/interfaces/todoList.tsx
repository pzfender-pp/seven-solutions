export interface ITodoItem {
    type: string;
    name: string;
    expiredTimestamp: moment.Moment | null;
}
