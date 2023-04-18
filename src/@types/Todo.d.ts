import { UserObject } from "./User";

export interface TodoObject{
    id: number,
    name: string,
    isComplete: boolean,
    user: number,
}

export type TodoContextType = {
    todoList: TodoObject[];
    todo: TodoObject | null;
    getThisTodo: (id: number) => void;
    deleteThisTodo: (id: number) => void;
    updateThisTodo: (todo: TodoObject) => void;
    createThisTodo: (todo: TodoObject) => void;
    userList: UserObject[];
    deleteDialogOpen: boolean;
    handleDeleteDialog: () => void;
};