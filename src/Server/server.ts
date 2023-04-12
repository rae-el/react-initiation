import {
    Server, 
    Model, 
    belongsTo, 
    hasMany, 
    RestSerializer, 
    Factory,
    JSONAPISerializer,
    Serializer,
} from "miragejs"
import { StringColorFormat, faker } from '@faker-js/faker'
//import { serialize } from "node:v8";

export interface TodoObject{
    id: number,
    name: string,
    isComplete: boolean,
    user: number,
}

export interface UserObject{
    type: string,
    id: number,
    attributes: Map<string, string>
    //attributes: UserAttributes
}

export interface UserAttributes{
    firstName: string,
    lastName: string
}

export function makeServer () {
    const server = new Server({
        serializers: {
            application: JSONAPISerializer.extend({
                alwaysIncludeLinkageData: false
            }),
            todo: RestSerializer.extend({
                serializeIds:"always",
                
            }),
             users: RestSerializer.extend({
                 include:["todo"],
                 embed: true,
             }),
        },
        models:{
            todo:Model.extend({
                user: belongsTo()
            }),
            user:Model.extend({
                todos: hasMany()
            })
        },
        factories: {
            user: Factory.extend({
                id(i:number){
                    return Number(i+1)
                },
                firstName(){
                    return faker.name.firstName()
                },
                lastName(){
                    return faker.name.lastName()
                }
            }),
            todo: Factory.extend({
                name(){
                    return faker.random.words(faker.datatype.number(4)+1)
                },
                isComplete: false
            })
        },
        seeds(server){
            const users = server.createList("user", 5)
            for(const user of users){
                server.createList("todo", faker.datatype.number(4), {user:user} as any)
            }
           
        },
        routes() {
            // todo apis
            // already implemented
            this.namespace = "api"
            this.get("/users", (schema: any) => {
                //console.log(schema.users.all())
                return schema.users.all()
            })
            this.get("/user/:id/todos", (schema:any, request)=> {
                const userID = request.params.id
                const todos = schema.todos.where({userID: userID})
                return {
                    todos: todos
                }
            })
            this.get("/todos", (schema: any, request) => {
                const active = request.params.active
                //console.log(active)
                return schema.todos.all()
            })
            this.get("/todo/:id", (schema:any, request)=>{
                const todoId = request.params.id
                const todo = schema.todos.find(todoId)
                return {
                    todo:todo
                }
            })
            this.delete("/todo/:id/delete", (schema:any, request)=> {
                const todoId = request.params.id
                schema.todos.find(todoId).destroy()
                return {success:true}

            })
            this.post("/todo/create", (schema:any,request)=>{
                let attrs = JSON.parse(request.requestBody)
                return schema.todos.create(attrs)
            })
            // to implement
            // get todo by name
            // string
            this.get("/todo/name/:name", (schema:any, request)=>{
                const todoName = request.params.todoName
                const todo = schema.todos.find(todoName)
                return {
                    todo:todo
                }
            })
            // get todo by completion status
            // bool
            this.get("/todos/completed", (schema:any)=>{
                const todos = schema.todos.where({isComplete:true})
                return {
                    todos:todos
                }
            })
            // edit todo
            this.patch("/todo/:id/update", (schema:any, request)=> {
                const todoId = request.params.id
                let attrs = JSON.parse(request.requestBody)
                schema.todos.find(todoId).update(attrs)
                return {success:true}
            })


        }
    })
    return server
}