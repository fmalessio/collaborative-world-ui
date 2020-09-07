import { MenuItem } from '../model/menu-item';
import { Role } from '../model/role';

export const menuItems: MenuItem[] = [
    {
        title: 'Donar',
        url: '/folder/donate',
        icon: 'heart',
        roles: [Role.DONOR]
    }, {
        title: 'Paquetes pendientes',
        url: '/folder/pending-packages',
        icon: 'briefcase',
        roles: [Role.DONOR]
    }, {
        title: 'Mis Donaciones',
        url: '/folder/my-donations',
        icon: 'list',
        roles: [Role.DONOR]
    }, {
        title: 'Calificar Colaborador',
        url: '/folder/rate-collaborator',
        icon: 'star-half',
        roles: [Role.DONOR]
    }, {
        title: 'Buscar donaciones',
        url: '/folder/search-donations',
        icon: 'map',
        roles: [Role.COLLABORATOR]
    }, {
        title: 'Notificaciones',
        url: '/folder/notifications',
        icon: 'chatbubble-ellipses',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }, {
        title: 'Configuración',
        url: '/folder/configuration',
        icon: 'person-circle',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }, {
        title: 'Cerrar sesión',
        url: '/folder/logout',
        icon: 'power',
        roles: [Role.DONOR, Role.COLLABORATOR]
    }
];