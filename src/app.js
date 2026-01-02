const express = require('express')

const app = express();

app.use((req, res)=> {
    res.send("Hello from dhdfui")
    })
    app.use("/teste",(req, res)=> {
        res.send("Hello from serve Zsfsr")
        });

app.use("/test",(req, res)=> {
res.send("Hello from server")
});

app.listen(3000, () => {
    console.log("server running on 3000 port")
})