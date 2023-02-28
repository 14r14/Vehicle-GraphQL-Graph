const {ApolloServer, gql} = require('apollo-server');

const resolvers = require('./resolvers');

const typeDefs = gql`

    type VehicleType {
        IsPrimary: Boolean
        Name: String
    }

    type VehicleTypeVerbose {
        GVWRFrom: String
        GVWRTo: String
        IsPrimary: Boolean
        Name: String
    }

    type Makes {
        Make_ID: ID!
        Make_Name: String!
    }

    type Manufacturer {
        Country: String!
        Mfr_CommonName: String
        Mfr_ID: ID!
        Mfr_Name: String!
        VehicleTypes: [VehicleType]!
    }

    type ManufacturerVerbose {
        Address: String!
        Address2: String
        City: String
        ContactEmail: String
        ContactFax: String
        ContactPhone: String
        Country: String
        DBAs: [String]
        EquipmentItems: [String]
        LastUpdated: String
        ManufacturerTypes: [String]
        Mfr_CommonName: String
        Mfr_ID: ID
        Mfr_Name: String
        OtherManufacturerDetails: String
        PostalCode: String
        PrimaryProduct: String
        PrincipalFirstName: String
        PrincipalLastName: String
        PrincipalPosition: String
        StateProvince: String
        SubmittedName: String
        SubmittedOn: String
        SubmittedPosition: String
        VehicleTypes: [VehicleTypeVerbose]
    }

    type Model {
        Make_ID: ID!
        Make_Name: String!
        Model_ID: ID!
        Model_Name: String!
    }

    type Query {
        getAllMakes: [Makes]!
        getAllManufacturers: [Manufacturer]!
        getManufacturerInfo(mfrId: String, name: String): [ManufacturerVerbose]
        getMakesForManufacturer(mfrId: String, name: String): [Makes]
        getModelsForMake(make: String!): [Model]
    }
`

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded"
});

server.listen().then(({url}) => {
    console.log(`Listening at ${url}`);
});