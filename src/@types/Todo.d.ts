import { UserObject, UserItem } from "./User";

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
    updatedTodo: ThisTodo | null;
    setUpdatedTodo: (todo: ThisTodo) => void;
    updatedName: string;
    setUpdatedName: (name: string) => void;
    updatedUserId: string;
    setUpdatedUserId: (id: string) => void;
    updatedCompletion: boolean;
    setUpdatedCompletion: (completion: boolean) => void;
    deleteId: string;
    setDeleteId: (id: string) => void;
    getThisTodo: (id: string) => void;
    deleteThisTodo: (id: string) => void;
    updateThisTodo: (todo: ThisTodo) => void;
    createThisTodo: (todo: ThisTodo) => void;
    userList: UserObject[];
    userMenuItems: UserItem[];
    deleteDialogOpen: boolean;
    handleDeleteDialog: () => void;
    deleteSuccessAlertOpen: boolean;
    setDeleteSuccessAlertOpen: (open: boolean) => void;
    deleteFailedAlertOpen: boolean;
    setDeleteFailedAlertOpen: (open: boolean) => void;
    createSuccessAlertOpen: boolean;
    setCreateSuccessAlertOpen: (open: boolean) => void;
    createFailedAlertOpen: boolean;
    setCreateFailedAlertOpen: (open: boolean) => void;
    updateSuccessAlertOpen: boolean;
    setUpdateSuccessAlertOpen: (open: boolean) => void;
    updateFailedAlertOpen: boolean;
    setUpdateFailedAlertOpen: (open: boolean) => void;
    setShowList: (todos: TodoObject[]) => void;
    getTodos: () => void;
    hours : number;
    minutes : number;
    date : number;
    dayString: string;
    monthString: string;
    isMobile: boolean;
};