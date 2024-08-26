export type Todo = {
    label: string;
    stars: string[];
    status: 'pending' | 'in-progress' | 'done';
    lastUpdatedBy?: string;
};
