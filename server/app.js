const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const schema = require("./schema/schema");
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

mongoose.connect(
  "mongodb+srv://orkhanrz:Orkhan080198@test.403gfqj.mongodb.net/graphql"
);

mongoose.connection.once('open', (err) => {
    if(err){
        throw new Error('Could not connect to the DB! Please check the connection uri!');
    }
    console.log('Connected to DB!');
    
    app.listen(PORT);
});
