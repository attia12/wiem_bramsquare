export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'Complété' | 'En attente' | 'En cours';
    type: 'paiement' | 'remboursement' | 'abonnement';
    icon?: string;
}
