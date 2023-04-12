import axios, { AxiosRequestConfig } from "axios";
import { TodoObject } from "../../server";

export class TodoService{
    //gets
    async getTodos(){
        //working
        try{
            const response = await axios.get("api/todos");
            return response.data.todos
        }catch (e){
            console.error(e)
        }
    }
    async getTodoById(id: string){
        //working
        try{
            const response = await axios.get(`/api/todo/${id}`)
            return response.data.todo
        }
        catch(e){
            console.error(e)
        }
    }
    
    //post
    async createTodo(newTodo: TodoObject){
        //working
    try{
        const response = await axios.post("api/todo/create", {method: 'POST', body: JSON.stringify(newTodo)})
        return response.data.todo
    }catch (e){
        console.error(e)
    }
    }
    //put
    async updateTodo(request: Request){
        try{
            await axios.post("api/todo/"+{request:request}+"/update")
        }catch (e){
            console.error(e)
        }
        }
    //delete
    async deleteTodo(id: number){
        //const todoId = request.params.id
        try{
            const response = await axios.delete(`api/todo/${id}/delete`)
            return response.data
        }catch (e){
            console.error(e)
        }
        }

    



}

