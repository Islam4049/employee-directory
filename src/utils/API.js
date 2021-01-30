import axios from "axios";
// eslint-disable-next-line
export default {
    // Gets all users
    getUsers: function () {
        return axios.get("https://randomuser.me/api/?results=300&nat=us");
    }
};