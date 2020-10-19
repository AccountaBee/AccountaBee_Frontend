import axios from "axios";

const instance = axios.create({
	baseURL: "https://accountabee.herokuapp.com/api"
});

export default instance;
