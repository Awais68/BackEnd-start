import express from 'express';
const app = express();
const PORT = 4000;


app.get('/', (req, res) => {
    // console.log("REQUEST=>", req)
    // res.send("Hello World to first API")
})

app.listen(PORT, () => console.log("server is running on PORT " + PORT))

