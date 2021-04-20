import { MenuItem } from '../model/menu-item';
import { Role } from '../model/role';

export const menuItems: MenuItem[] = [
    {
        title: 'Donar',
        url: '/donation/donate',
        icon: 'heart',
        roles: [Role.DONOR]
    }, {
        title: 'Paquetes pendientes',
        url: '/donation-list/my-pending',
        icon: 'briefcase',
        roles: [Role.DONOR]
    }, {
        title: 'Mis Donaciones',
        url: '/donation-list/my',
        icon: 'list',
        roles: [Role.DONOR]
    }, {
        title: 'Calificar Recolector',
        url: '/folder/rate-collaborator',
        icon: 'star-half',
        roles: [Role.DONOR]
    }, {
        title: 'Buscar donaciones',
        url: '/donation-list/nearby',
        icon: 'map',
        roles: [Role.COLLABORATOR]
    }, {
        title: 'Retiros pendientes',
        url: '/donation-list/pending-to-collect',
        icon: 'car',
        roles: [Role.COLLABORATOR]
    }, {
        title: 'Notificaciones',
        url: '/notification-list',
        icon: 'chatbubble-ellipses',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }, {
        title: 'Configuración',
        url: '/folder/configuration',
        icon: 'person-circle',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }, {
        title: 'Cerrar sesión',
        url: '/auth/do/logout',
        icon: 'power',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }
];