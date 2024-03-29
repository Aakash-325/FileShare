import axios from "axios";

const API_URL = "http://localhost:5000"

export const UploadFile = async (data) => {
    try{
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch(error){
        console.log(error)
    }
}