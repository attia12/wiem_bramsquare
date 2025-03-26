export interface Rapport {
    title: string;
    description: string;
    email?:string;
    format: 'PDF' | 'CSV';
}
