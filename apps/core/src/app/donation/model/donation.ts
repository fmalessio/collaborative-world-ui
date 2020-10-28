import { Box } from './box';
import { Geolocation } from './geolocation';

export class Donation {
    id?: string;
    geolocation: Geolocation;
    box: Box;
    follow: boolean;
    ammount: number;
    pathPhotoEvidence?: string;
    startDate: number;
    endedDate?: number;
}
