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
    showList: TodoObject[];
    thisTodo: ThisTodo | null;
    getThisTodo: (id: string) => void;
    deleteThisTodo: (id: string) => void;
    updateThisTodo: (todo: ThisTodo) => void;
    createThisTodo: (todo: ThisTodo) => void;
    userList: UserObject[];
    deleteDialogOpen: boolean;
    handleDeleteDialog: () => void;
    deleteAlertOpen: boolean;
    setDeleteAlertOpen: (open: boolean) => void;
    createSuccessAlertOpen: boolean;
    setCreateSuccessAlertOpen: (open: boolean) => void;
    setShowList: (todos: TodoObject[]) => void;
    getTodos: () => void;
    hours : number;
    minutes : number;
    date : number;
    dayString: string;
    monthString: string;
};