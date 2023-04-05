import axios from "axios";

export class UserService{
    async getUsers(){
        try{
            const response = await axios.get("/users");
            console.log(response)
            const data = response.data.data
            return response.data.data
        }catch (e){
            console.error(e)
        }
    }



}

