const express = require('express'); // load express module
const nedb = require("nedb-promises"); // load nedb module


const port = 4000;
const app = express();
const db = nedb.create('myfile.json'); // init db

app.use(express.static("public"));


// let hits = {};
app.get('/hits/:pageId', async (req, res)=>{
    const pageId = req.params.pageId
    console.log(pageId)
    //check if the page already exists in db
    let page = await db.findOne({pageId})

    if(page){
        //increassing page hit count
        page.hits += 1
        await db.update({pageId}, {$set: {hits: page.hits}});
    }else{
        // intial vist
        page = {pageId, hits: 1};
        await db.insert(page);
    }

    // const pagehit = (hits[req.params.pageId] || 0) + 1;
    // hits[req.params.pageId] = pagehit;
    
    res.send((page.hits).toString());
});

app.all("*", (req, res)=>{
    res.status(404).send("Invalid URL....")
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
});