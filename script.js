const express = require('express');
const app = express();

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient

const bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded default config
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    const task = console.log("First interaction");
    return res.status(201).json(task)
})

// Get all task on project 
app.get('/task', async (req, res) => {
  const listTask = await prisma.tasks.findMany();

  res.json({
    data: listTask,
  });
});

// Created Tasks 
app.post('/task', async (req, res) => {
  const titleName = req.body.title;
  
  if (!titleName){
    return res.status(400).json({message: 'Title is missing, please try to insert something on body'})
  }

  try {
    const message = 'Task created succefully';
    const Task = await prisma.tasks.findFirst({
      where: { title: titleName}
    });

    if (!Task){
      await prisma.tasks.create({
        data: {
          'title': titleName,
        }
      });
      console.log('Created a new title, lets start');
      return res.json({message});
    }
    return res.json({data});

  } catch(e) {
    console.error(e);
    return res.status(500).json({message: 'something wrong or try to insert something diferent'});
  }
});

app.delete('/task', async (req, res) => {
  const IdTask = req.body.id;
  
  if(!IdTask){
    return res.status(400).json({message:'Id is missing, please try to insert a Id Task valid'})
  }

  try{
    const ID = await prisma.tasks.findFirst({
      where:{ id: IdTask},
    });

    if(!ID){
      await prisma.tasks.delete({
        where:{
          id : IdTask
        },
      });
      return res.json({menssage:'Task deleted succefully!'})
    };
    return res.json({data});

  } catch(e){
    console.error(e);
    return res.status(500).json({message: 'Something wrong'});
  };

});













app.listen(8080,()=> {
  console.log(`server running`)
});