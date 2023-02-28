const axios = require("axios");
const { UserInputError } = require("apollo-server");

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
    getManufacturerInfo: async (root, { mfrId, name }) => {
      if (!mfrId && !name) {
        throw new UserInputError("Please provide an id or name");
      }
      if (!mfrId) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetManufacturerDetails/${name}?format=json
        `)
        return res.data["Results"];
      }
      if (!name) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetManufacturerDetails/${mfrId}?format=json
        `)
        return res.data["Results"];
      }
    },
    getMakesForManufacturer: async (root, { mfrId, name }) => {
      if (!mfrId && !name) {
        throw new UserInputError("Please provide an id or name");
      }
      if (!mfrId) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetMakeForManufacturer/${name}?format=json
        `)
        return res.data["Results"];
      }
      if (!name) {
        const res = await axios.get(`
          ${externalApiURL}/vehicles/GetMakesForManufacturer/${mfrId}?format=json
        `)
        return res.data["Results"];
      }
    },
    getModelsForMake: async (root, { make }) => {
      const res = await axios.get(`
        ${externalApiURL}/vehicles/GetModelsForMake/${make}?format=json
      `)
      return res.data["Results"];
    },
  },
};

module.exports = resolvers;
