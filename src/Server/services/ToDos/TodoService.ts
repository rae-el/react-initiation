import axios from "axios";

export class TodoService{
    async getTodos(){
        try{
            const response = await axios.get("/todos");
            console.log(response)
            return response.data.todos
        }catch (e){
            console.error(e)
        }
    }



}

