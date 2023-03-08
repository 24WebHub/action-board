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

if(req.method === 'PUT') {
const {taskId} = req.query
const {title, completionDate} = req.body

if(!title || title.trim() === '' ||!completionDate ||completionDate.trim() === '')  {
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


try {
  const existingProject = await db.collection('projects').findOne({title: project})

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
} catch (error) {
  client.close()
  res.status(422).json({message: 'Something went wrong'})
  return
}



try {
  await db.collection('projects').updateOne({"tasks._id": ObjectId(taskId)}, {$set: {"tasks.$[el].title": title, 'tasks.$[el].completionDate': completionDate}}, {arrayFilters: [{"el._id" :ObjectId(taskId)}]})
 } catch (error) {
  client.close()
   res.status(500).json({message: 'The application encounter issues updating task'})
   return
 }
 client.close()
   res.status(200).json({message: 'Task updated successfully'})
  }

}