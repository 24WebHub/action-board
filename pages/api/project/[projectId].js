import connectToDB from "../../../lib/db";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

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

if(req.method === 'GET') {
  const {projectId} = req.query

    const storedProject = await db.collection('projects').findOne({_id: ObjectId(projectId)})

    if(!storedProject) {
      res.status(401).json({message: 'The system encounter problem fetching project from the server'})
      return
    }
    
  res.status(200).json({project: storedProject})
}

if(req.method === 'PUT') {
const {projectId} = req.query
const {title, completionDate, description} = req.body

if(!title || title.trim() === '' ||!completionDate ||completionDate.trim() === '' ||!description || description.trim() === '')  {
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

const existingProject = await db.collection('projects').findOne({_id: ObjectId(projectId)})

if(title !== existingProject.title)  {
  const existingTitleProject = await db.collection('projects').findOne({title: title})
  if(existingTitleProject){
    res.status(422).json({message: "Project Title Already Exist"})
    client.close()
    return
  }
}

try {
  await db.collection('projects').updateOne({_id: ObjectId(projectId)}, {$set: {title: title, description: description, completionDate: completionDate} })
} catch (error) {
  res.status(401).json({message: 'The system ecounter issue updating the roject'})
  client.close()
  return
}

client.close()
res.status(201).json({message:'Project updated successfully'})
}

}