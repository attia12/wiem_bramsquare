/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'principal',
        title: 'PRINCIPAL',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.tableau_de_bord',
                title: 'Tableau de bord',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/dashboards/project',
            },
            {
                id: 'dashboards.calendrier_des_paiements',
                title: 'Calendrier des paiements',
                type: 'basic',
                icon: 'heroicons_outline:calendar-days',
                link: '/dashboard/payment',
            },
            {
                id: 'dashboards.investissements',
                title: 'Investissements',
                type: 'basic',
                icon: 'heroicons_mini:arrow-trending-up',
                link: '/dashboard/investissement',
            },
            {
                id: 'dashboards.transactions',
                title: 'Transactions',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/transaction',
            },
        ],
    },
    {
        id: 'rapports',
        title: 'RAPPORTS',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'coûts_de_livraison',
                title: 'Coûts de Livraison',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/dashboard/delivery-costs',
            },
            {
                id: 'apps.contrôle_des_commissions',
                title: 'Contrôle des Commissions',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/dashboard/commissions',
            },
            {
                id: 'apps.fiches_de_paie',
                title: 'Fiches de paie',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/dashboard/paylist',
            },

        ],
    },
    {
        id: 'administration',
        title: 'ADMINISTRATION',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'détection_de_fraude',
                title: 'Détection de fraude',
                type: 'basic',
                icon: 'heroicons_outline:shield-exclamation',
                link: '/apps/academy',
            },
            {
                id: 'apps.négociation_fournisseurs',
                title: 'Négociation Fournisseurs',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/apps/chat',
            },
            {
                id: 'apps.conformité',
                title: 'Conformité',
                type: 'basic',
                icon: 'heroicons_outline:lock-closed',
                link: '/apps/contacts',
            },
            {
                id: 'apps.settings',
                title: 'Paramétres',
                type: 'basic',
                icon: 'mat_solid:settings_suggest',
                link: '/apps/contacts',
            }

        ],
    },




];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:squares-2x2',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:squares-2x2',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        type: 'group',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Misc',
        type: 'group',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
