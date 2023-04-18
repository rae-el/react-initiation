import axios, { AxiosRequestConfig } from "axios";
import { ModelInstance } from "miragejs";
import { TodoObject } from "../../../@types/Todo";

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
    async deleteTodo(id: string){
        //working
        try{
            const response = await axios.delete(`api/todo/${id}/delete`)
            return response
        }catch (e){
            console.error(e)
        }
        }
    //post
    async createTodo(todo: TodoObject){
        //not working
        const json = JSON.stringify(todo)
        
    try{
        const response = await axios.post("api/todo/create", todo)
        return response.data.todo
    }catch (e){
        console.error(e)
    }
    }
    //put
    async updateTodo(todo: TodoObject){
        //not working
        try{
            const response = await axios.post(`api/todo/${todo}+/update`)
            return response.data.todo
        }catch (e){
            console.error(e)
        }
        }
    

    



}

