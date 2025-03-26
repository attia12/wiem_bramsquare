export interface DeliveryCost {
    name: string;           // Nom du restaurant
    totalCost: number;      // Coût total (€)
    orders: number;         // Nombre de commandes
    avgTime: number;        // Temps moyen (en minutes)
    costPerOrder: number;   // Coût par commande (€)
}
