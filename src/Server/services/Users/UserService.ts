import axios from "axios";
import { UserObject } from '../../../Server/server';

export class UserService{

    async getUsers(){
        try{
            const response = await axios.get("api/users");
            console.log(response)
            const data = response.data.data
            return response.data.data
        }catch (e){
            console.error(e)
        }
    }



}

