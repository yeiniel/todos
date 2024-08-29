export interface Todo {
    id?: string;
    label: string;
    stars: string[];
    status: 'pending' | 'in-progress' | 'done';
    lastUpdatedBy?: string;
}
