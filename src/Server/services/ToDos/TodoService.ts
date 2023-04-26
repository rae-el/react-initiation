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
            const response = await axios.delete(`api/todo/${id}/delete`)
            return response
        }catch (e){
            console.error(e)
        }
        }
    //post
    async createTodo(todo: ThisTodo){
        //working
        
    try{
        const response = await axios.post("api/todo/create", todo)
        return response.data.todo
    }catch (e){
        console.error(e)
    }
    }
    //put or patch
    async updateTodo(todo: ThisTodo){
        //not working
        //"Mirage: Your app tried to PUT 'api/todo/1/update', but there was no route defined to handle this request. Define a route for this endpoint in your routes() config. Did you forget to define a namespace? The existing namespace is undefined"
        let id : string = todo.id
        try{
            const response = await axios.put(`/api/todo/${id}`, todo)
            return response
        }catch (e){
            console.error(e)
        }
        }
    

    



}

