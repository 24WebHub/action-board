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
    res.status(500).json({message: 'Connecting to the database failed'})
    return
  }

  const db = client.db()

    // Get Projects
    if(req.method === 'GET') {
    const allProjects = await db.collection('projects').find().sort({_id: -1}).toArray()
    if(!allProjects){
      res.status(401).json({message: 'There are no projects for this user'})
      return
    }
    res.status(200).json({allProjects: allProjects})
      return
  }

  // Create Project 
  if(req.method === 'POST') {
  
    const {title, completionDate, status, description} = req.body;

    if(!title || title.trim() === '' ||!completionDate ||completionDate.trim() === '' ||!description || description.trim() === '' ||!status || status.trim() === '')  {
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

    if(completionDate < formatedDate) {
      res.status(423).json({message: 'Project completion date cannot preceed today'})
      return
    }

  try {
    const existingProject = await db.collection('projects').findOne({title: title})
    if(existingProject) {
      res.status(422).json({message: "Project Title Already Exist"})
      return
    }
  } catch (error) {
    res.status(500).json({message: 'The application encounter issues connecting to server'})
    return
  }

  const savedUser = await db.collection('users').findOne({email: session.user.email})

  const projectedUser = {email: savedUser.email, fullname: savedUser.fullname, _id: savedUser._id}
 
  try {
      await db.collection('projects').insertOne({
      title: title, 
      completionDate: completionDate,
      description: description, 
      status: status,
      user: projectedUser,
      tasks: [],
    })
  } catch (error) {
    res.status(500).json({message: 'Inserting  data failed'})
    return;
  }

    res.status(201).json({ message: "Project created successfully!"})

   }

  // Set Project as Completed
  
   if(req.method === 'PATCH') {

    const {projectId, status} = req.body
    const updatedDate = new Date()
    // get the project
    const projectToBeUpdated = await db.collection('projects').findOne({_id: ObjectId(projectId)})
       // get the tasks
    const tasks = projectToBeUpdated.tasks
        // check if the tasks array has item in it
    if(tasks.length ===  0 ) {
          // if it has no item, return and send error message
      res.status(422).json({message: 'You cannot complete a project with empty task(s)'})
      return
    }
    //ELSE check to see that all the items are completed
 const tasksStatus = tasks.find(task => task.status === 'To Do' || task.status === 'In Progress')
  if(tasksStatus !== undefined) {
      // if not return and send error message
  res.status(422).json({message: 'All tasks must be completed'})
  return
}
    // it they are completed, go ahead and set the project as completed
  try {
  const updatedProject = await db.collection('projects').updateOne({_id: ObjectId(projectId)}, {$set: {status: status, updatedDate: updatedDate}})
    res.status(200).json({message: "Project updated successfully"})
  } catch (error) {
    res.status(500).json({message: 'Could not update the project'})
    return
  }
   }

  //  Delete Project
     if(req.method === 'DELETE') {
      const {id} = req.query
  try {
    const project = await db.collection('projects').deleteOne({_id: ObjectId(id)})
    if(project) {
      client.close()
      res.status(201).json({message: "Project updated successfully"})
    }
  } catch (error) {
    client.close()
    res.status(500).json({message: 'The application encounter issues connecting to server'})
    return
  }
    
}


  }


