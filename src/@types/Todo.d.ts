import { UserObject } from "./User";

export interface TodoObject{
    id: string,
    name: string,
    isComplete: boolean,
    user: string,
}

export interface ThisTodo{
    id: string,
    name: string,
    isComplete: boolean,
    userId: string,
}

//should I seperate the Todo item with the user vs with the userId?

export type TodoContextType = {
    todoList: TodoObject[];
    thisTodo: ThisTodo | null;
    getThisTodo: (id: string) => void;
    deleteThisTodo: (id: string) => void;
    updateThisTodo: (todo: TodoObject) => void;
    createThisTodo: (todo: TodoObject) => void;
    userList: UserObject[];
    deleteDialogOpen: boolean;
    handleDeleteDialog: () => void;
};