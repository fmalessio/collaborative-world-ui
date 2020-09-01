import { Role } from './role';

export interface MenuItem {
    title: string;
    url: string;
    icon: string;
    roles: Role[];
}
