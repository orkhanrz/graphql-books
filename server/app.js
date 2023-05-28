require('dotenv/config')
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const schema = require("./schema/schema");
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI || '';

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

mongoose.connect(MONGODB_CONNECTION_URI);

mongoose.connection.once('open', (err) => {
    if(err){
        throw new Error('Could not connect to the DB! Please check the connection uri!');
    }
    console.log('Connected to DB!');
    
    app.listen(PORT);
});
