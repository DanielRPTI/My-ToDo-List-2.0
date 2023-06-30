const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

const bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    const task = console.log("First interaction");
    return res.status(201).json(task)
})

app.get('/task', async (req, res) => {
  const listTask = await prisma.tasks.findMany();

  res.json({
    data: listTask,
  });
});

app.post('/task', async (req, res) => {
  
  try {
    const data = req.body;
    console.log(!data)

//    const message = 'Tarefa criada com sucesso'; 
//    await prisma.tasks.create({
//      data: {
//        'title' : {titleName},
//      }
//    });
//    console.log('Created Task')
    return res.json({data});

  } catch(e) {
    console.error(e);
    return res.status(500).json({message: 'something wrong'});
  }
})

app.listen(3000,()=> {
  console.log(`server running`)
});