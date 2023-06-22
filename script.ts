import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createTask() {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        title: 'Tarefa Teste',
        taskDone: false
      }
    })

    console.log('Nova tarefa criada:', newTask)
  } catch (error) {
    console.error('Erro ao criar nova tarefa:', error)
  } finally {
    await prisma.$disconnect()
  }
}






// Executa a função createTask separadamente