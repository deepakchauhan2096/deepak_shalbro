const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const middlewareFunctions = require('./middlewares/middlewareFunctions')
const app = express();
const axios = require('axios')
const authString = true
    ? "MeCHHkZ9:tdypsA =:lqBZghxJgaVE"
    : "lRRqlkYefuV=:lRRqlkYefuV6jJ==:qzOUsBmZFgMDlwGtrgYypxUz";
const consolere = require('console-remote-client').connect({ server: 'https://console.re', channel: 'shalbro_backend' });
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: "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"
})
const openai = new OpenAIApi(configuration)
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true, parameterLimit: 50000, limit: "50mb" }));



const mongoose = require('./db/mongo_connection')
const mongoSchemaModel = require('./models/schema')

const msgObject = require('./responseeMsg.json')
const Schema = mongoose.Schema;


app.post('/create_admin', middlewareFunctions.checkAuth, middlewareFunctions.verifying, (req, res) => {
    try {

        console.log(req.body)
        mongoSchemaModel.countermodel.findOneAndUpdate(
            { id: "autoval" },
            { "$inc": { "seq": 1 } },
            { new: true }, (err, cd) => {

                console.log("counter value : ", cd);

                let seqId;
                if (cd == null) {
                    const newval = new mongoSchemaModel.countermodel({ id: "autoval", seq: 1 })
                    newval.save();
                    seqId = 1;
                } else {
                    seqId = cd.seq
                }
                req.body.ADMIN_ID = cd.seq
                let AdminModel = mongoSchemaModel.AdminModel(req.body.ADMIN_USERNAME)
                AdminModel.insertMany(req.body, (err, response) => {
                    if (err) res.json({
                        operation: msgObject.failed,
                        result: null,
                        errorMsg: err
                    })
                    else res.json({
                        operation: msgObject.success,
                        result: response,
                        errorMsg: null
                    })
                })


            })
    } catch (error) {
        res.json({
            operation: msgObject.failed,
            result: null,
            errorMsg: error
        })
    }
})










let PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server Running on => `, PORT);
});