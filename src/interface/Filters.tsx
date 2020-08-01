export interface Filter {
    id: string;
    name: string;
    values?: Value[];
    validation?: Validation;
}

interface Value {
    value: string;
    name: string;
}

interface Validation {
    primitiveType: string;
    entityType: string;
    pattern?: string;
    min?: number,
    max?: number
}

export interface QueryFilter{
    field: string;
    value: string;
}