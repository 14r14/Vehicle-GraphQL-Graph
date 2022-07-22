const axios = require("axios");
const { UserInputError } = require("apollo-server");
const _ = require("lodash/core");

const externalApiURL = "https://vpic.nhtsa.dot.gov/api";

const resolvers = {
  Query: {
    getAllMakes: async () => {
      const res = await axios.get(
        `${externalApiURL}//vehicles/GetAllMakes?format=json`
      );
      return res.data["Results"];
    },
    getAllManufacturers: async () => {
      const res = await axios.get(
        `${externalApiURL}/vehicles/GetAllManufacturers?format=json`
      );
      return res.data["Results"];
    },
    getManufacturerInfo: async (root, { id, name }) => {
      if (!id && !name) {
        throw new UserInputError("Please provide an id or name");
      }
      if (!id) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetManufacturerDetails/${name}?format=json
        `)
        return res.data["Results"];
      }
      if (!name) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetManufacturerDetails/${id}?format=json
        `)
        return res.data["Results"];
      }
    },
  },
};

module.exports = resolvers;
