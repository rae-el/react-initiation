import axios, { AxiosRequestConfig } from "axios";

export class TodoService{
    //gets
    async getTodos(){
        try{
            const response = await axios.get("/todos");
            console.log(response)
            return response.data.todos
        }catch (e){
            console.error(e)
        }
    }
    async getTodosByComplete(){
        try{
            const response = await axios.get("/todos/compelete")
            return response.data.todos
        }catch (e){
            console.error(e)
        }
    }
    async getTodosByUser(request: string){
        try{
            const response = await axios.get("/user/"+{request}+"/todos")
        }catch (e){
            console.error(e)
        }
    }

    async getTodosById(request: string){
        try{
            const response = await axios.get("/todo/"+{request})
        }catch (e){
            console.error(e)
        }
    }

    async getTodosByName(request: string){
        try{
            const response = await axios.get("/todo/name/"+{request})
        }catch (e){
            console.error(e)
        }
    }
    
    //post
    async createTodo(request: string){
    try{
        const response = await axios.post("/todos/create", {request:request})
    }catch (e){
        console.error(e)
    }
    }
    //put
    async updateTodo(request: string){
        try{
            const response = await axios.post("/todo/"+{request:request}+"/update")
        }catch (e){
            console.error(e)
        }
        }
    //delete
    async deleteTodo(request: string){
        try{
            const response = await axios.post("/todo/"+{request:request}+"/delete")
        }catch (e){
            console.error(e)
        }
        }

    



}

