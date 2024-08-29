import { Todo } from "./todo";

export function makeTodo(label: Todo['label']) {
    return {
        label,
        stars: [],
        status: 'pending' as const
    }
}