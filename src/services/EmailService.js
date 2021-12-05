import axios from "axios";

const {REACT_APP_API_ENDPOINT} = process.env;
const API = REACT_APP_API_ENDPOINT + "/api/email";

export const EmailService = {
  contacto: async (contactInformation) => {
    return await axios
      .post(API + "/contacto", contactInformation)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
