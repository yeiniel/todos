import { Todo } from "../todo";

export type Item = Todo & {
    starred: boolean;
    inProgress: boolean;
}