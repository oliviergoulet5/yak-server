export type ActivityStatus = 'online' | 'away' | 'busy' | 'offline';

export interface User {
    userId: number;
    username: string;
    activityStatus: ActivityStatus;
    avatarUrl: string;
}

export interface UserResponse {
    id: string,
    email: string,
    username: string,
    avatarUrl?: string,
    activityStatus: ActivityStatus
}