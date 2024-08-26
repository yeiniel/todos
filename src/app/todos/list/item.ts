import { Todo } from "../todo";

export type Item = Omit<Todo, 'stars'> & {
    starred: boolean;
    inProgress: boolean;
}