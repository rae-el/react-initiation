import axios, { AxiosRequestConfig } from "axios";
import { TodoObject, UserObject } from "../../server";
import { ModelInstance } from "miragejs";

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
    //delete
    async deleteTodo(id: number){
        //working
        try{
            const response = await axios.delete(`api/todo/${id}/delete`)
            return response.data
        }catch (e){
            console.error(e)
        }
        }
    //post
    async createTodo(id: number, name: string, isComplete: boolean, user: UserObject){
        //not working
        
    try{
        const response = await axios.post("api/todo/create", {id,name,isComplete,user})
        return response.data.todo
    }catch (e){
        console.error(e)
    }
    }
    //put
    async updateTodo(request: Request){
        //not working
        try{
            await axios.post("api/todo/"+{request:request}+"/update")
        }catch (e){
            console.error(e)
        }
        }
    

    



}

