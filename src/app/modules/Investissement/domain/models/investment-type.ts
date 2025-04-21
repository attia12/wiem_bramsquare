export interface FieldDefinition {
    label: string;
    type: string;
    required: boolean;
}

export interface InvestmentType {
    id: string;
    name: string;
    fields: { [key: string]: FieldDefinition };
    processorClassName: string;
    derivedFieldFormulas: { [key: string]: string };
}
