const express = require('express');
const app = express();


app.listen(8080,()=> {
  console.log(`server running`)
});

app.get('/task', (req, res) =>{
    const task = console.log("First interaction");
    return res.status(201).json(task)
})