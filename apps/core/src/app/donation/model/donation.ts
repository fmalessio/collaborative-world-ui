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
    user?: User;
    userId: string;
    transactions: DonationTransaction[];
}

export class DonationTransaction {
    uuid: string;
    generationDate: Date;
    state: string;
    collaborator?: User;
    collaborator_id?: string;
}

export enum DONATION_STATE {
    CREATED = 'CREATED',
    READY_TO_TRAVEL = 'READY_TO_TRAVEL',
    PENDING_TO_COLLECT = 'PENDING_TO_COLLECT',
    CANCELLED = 'CANCELLED',
    IN_TRAVEL = 'IN_TRAVEL',
    FINALIZED = 'FINALIZED',
    DONATED_AGAIN = 'DONATED_AGAIN'
}

export const UPDATED_AT_FOR_STATE = (transactions: DonationTransaction[], state: string): Date => {
    return GET_LAST_TRANSACTION(transactions, state).generationDate;
}

export const GET_LAST_TRANSACTION = (transactions: DonationTransaction[], state: string): DonationTransaction  => {
    return transactions.find(t => t.state === state);
}

export interface User {
    uuid: string;
}
