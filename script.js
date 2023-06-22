const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient


app.listen(4006,()=> {
  console.log(`server running`)
});

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
  const titleName = req.body;

  try {
    const message = 'Tarefa criada com sucesso'; 
      await prisma.tasks.create({
        data: {
          'title' : {titleName},
        }
      });
      console.log('Created Task')
      return res.json({message});
    

  } catch(e) {
    console.error(e);
    return res.status(500).json({message: 'something wrong'});
  }
})