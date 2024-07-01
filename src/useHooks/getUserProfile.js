import { addUser } from "../utils/userSlice";
import axios from "axios";

const getUserprofile = async (dispatch, userName) => {
    try {
      const res = await axios.get(
        `/api/users/c/${userName}`,
        { withCredentials: true }
      );
      if (res) {
        dispatch(addUser(res.data.data));
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };

  export default getUserprofile;