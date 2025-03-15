import express from "express";

const port = 4000;
const app = express();


app.use(express.static("public"));


let hits = {};
app.get('/hits/:pageId', (req, res)=>{
    const pagehit = (hits[req.params.pageId] || 0) + 1;
    hits[req.params.pageId] = pagehit;
    res.send((pagehit).toString());
});

app.all("*", (req, res)=>{
    res.status(404).send("Invalid URL....")
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
});