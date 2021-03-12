import { Box } from './box';
import { Geolocation } from './geolocation';

export class Donation {
    uuid?: string;
    geolocation: Geolocation;
    box: Box;
    follow: boolean;
    amount: number;
    state: string;
    pathPhotoEvidence?: string;
    startDate?: number;
    endedDate?: number;
    user: User;
    transactions: DonationTransaction[];
}

export class DonationTransaction {
    uuid: string;
    generationDate: Date;
    state: string;
}

export enum DONATION_STATE {
    CREATED = 'CREATED',
    READY_TO_TRAVEL = 'READY_TO_TRAVEL',
    CANCELLED = 'CANCELLED',
    IN_TRAVEL = 'IN_TRAVEL',
    FINALIZED = 'FINALIZED',
    DONATED_AGAIN = 'DONATED_AGAIN'
}

export const UPDATED_AT_FOR_STATE = (transactions: DonationTransaction[], state: string) => {
    return transactions.find(t => t.state === state).generationDate;
}

export interface User {
    uuid: string;
}
