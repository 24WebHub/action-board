import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import connectToDB from '../../../lib/db';

export default async function handler(req, res) {

  // Authenticate User Session
  const session = await getSession({req: req})

  if(!session) {
    res.status(401).json({message: 'Not authenicated'})
    return
  }
 
  // Connect to DB
  let client;
  try {
     client = await connectToDB()
  } catch (error) {
    res.status(500).json({message: 'Could not fetch data from the server'})
    return
  }

  const db = client.db()

  // Create Task 
  if(req.method === 'POST') {
  
    const {title, completionDate, status, project} = req.body;

    if(!title || title.trim() === '' ||!completionDate ||completionDate.trim() === ''||!status || status.trim() === '' ||!project || project.trim() === '')  {
      res.status(422).json({message: 'Please fill all value properly'})
      return 
    }

    const  formatDate = ((date = new Date()) =>{
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {month: '2-digit'});
      const day = date.toLocaleString('default', {day: '2-digit'});
    
      return [year, month, day].join('-');
    })
     
    const formatedDate = formatDate() 

    let existingProject;

    try {
       existingProject = await db.collection('projects').findOne({title: project})

    } catch (error) {
      res.status(422).json({message: 'Could not fetch data from the server'})
    }

    if(completionDate > existingProject.completionDate) {
      client.close()
      res.status(433).json({message: 'Task completion date cannot exceed project completion date'})
      return
    }
    
    if(completionDate < formatedDate ) {
      client.close()
     res.status(423).json({message: 'Task completion date cannot preceed today'})
      return
      }


  const tasks = {
    title: title, 
    completionDate: completionDate,
    status: status,
    _id: new ObjectId
  }

  try {
    await db.collection('projects').updateOne({title: project}, {$push: {tasks: tasks}})
  } catch (error) {
    client.close()
    res.status(500).json({message: 'Creating  task failed'})
    return
  }
    client.close()
    res.status(201).json({ message: "Task created successfully!"})
    return
   }


  // Set Task Status
  if(req.method === 'PATCH') {
  const {taskId, status} = req.body
  const updatedDate = new Date()
// 1. check if the status "In Pprogress" progress
if(status === 'In Progress') {
// 3. if yes, access all tasks in the project, 
  const existingProject = await db.collection('projects').findOne({'tasks._id': ObjectId(taskId)})
  const tasks = existingProject.tasks 

  const existingTask = tasks.find(task => task.status === 'In Progress') 
  if(existingTask === undefined){
    try {
      await db.collection('projects').updateOne({'tasks._id': ObjectId(taskId)}, {$set: {status: status}})
    } catch (error) {
      res.status(500).json({message: 'The application encounter issues updating task'})

    }
  }
}

  try {
   await db.collection('projects').updateOne({"tasks._id": ObjectId(taskId)}, {$set: {"tasks.$[el].status": status, 'tasks.$[el].updatedDate': updatedDate}}, {arrayFilters: [{"el._id" :ObjectId(taskId)}]})
  } catch (error) {
    res.status(500).json({message: 'The application encounter issues updating task'})
  }
  
  client.close()
    res.status(200).json({message: 'Task updated successfully'})
   }



     //  Delete Task
 if(req.method === 'DELETE') {
    const {id} = req.query
  try {
    const task = await db.collection('projects').updateOne({"tasks._id": ObjectId(id)}, {$pull: {tasks: {_id: ObjectId(id)} }})
    if(task) {
      client.close()
      res.status(201).json({message: "Task deleted successfully"})
    }
  } catch (error) {
    client.close()
    res.status(500).json({message: 'Could not fetch data from the server'})
  }
    
}
  }