import axios from "axios";

const API = "http://localhost:8080/api/email";

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
