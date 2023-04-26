import axios, { AxiosRequestConfig } from "axios";
import { ModelInstance } from "miragejs";
import { ThisTodo, TodoObject } from "../../../@types/Todo";

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
            const response = await axios.delete(`/api/todo/${id}/delete`)
            return response.status
        }catch (e){
            console.error(e)
        }
        }
    //post
    async createTodo(todo: ThisTodo){
        //working
        
    try{
        const response = await axios.post("api/todo/create", todo)
        return response.status
    }catch (e){
        console.error(e)
    }
    }
    //put or patch
    async updateTodo(todo: ThisTodo){
        //not working
        let id : string = todo.id
        try{
            const response = await axios.put(`/api/todo/${id}`, todo)
            return response
        }catch (e){
            console.error(e)
        }
        }
    

    



}

