export enum PaymentMethod {
    CARD = 'CARD',
    MOBILE_MONEY = 'MOBILE_MONEY',
    PAYPAL = 'PAYPAL'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export enum PaymentType {
    BILL = 'BILL',
    SALARY = 'SALARY',

}

export enum RecurrenceType {
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export interface Payment {
    id?: string;
    amount: number;
    date: Date;
    method: PaymentMethod;
    status: PaymentStatus;
    type: PaymentType;
    beneficiary: string;

    recurring: boolean;
    recurrenceEndDate?: Date;
    recurrenceType?: RecurrenceType;
}
