import { Box } from './box';

export class Donation {
    id: string;
    geolocation: Geolocation;
    box: Box;
    follow: boolean;
    ammount: number;
    pathPhotoEvidence: string;
    startDate: number;
    endedDate: number;
}
