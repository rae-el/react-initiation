import { UserObject } from "./User";

export interface TodoObject{
    id: string,
    name: string,
    isComplete: boolean,
    user: string | null,
    userId: string | null,
}

export type TodoContextType = {
    todoList: TodoObject[];
    todo: TodoObject | null;
    getThisTodo: (id: string) => void;
    deleteThisTodo: (id: string) => void;
    updateThisTodo: (todo: TodoObject) => void;
    createThisTodo: (todo: TodoObject) => void;
    userList: UserObject[];
    deleteDialogOpen: boolean;
    handleDeleteDialog: () => void;
};