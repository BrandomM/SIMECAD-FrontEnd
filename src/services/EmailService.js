import axios from "axios";

const API = "http://localhost:8080/api/email";

export const EmailService = {
  contacto: async (contactInformation) => {
    await axios
      .post(API + "/contacto", contactInformation)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
