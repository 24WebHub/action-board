import connectToDB from '../../../lib/db';
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {
  const session = await getSession({req: req})

    if(!session) {
      res.status(401).json({message: 'Not authenicated'})
      return
    }

  //Connect to DB
    let client;
    try {
       client = await connectToDB()
    } catch (error) {
      res.status(500).json({message: 'Connection to the database failed'})
      return
    }

  
  const db = client.db()

  if(req.method === 'GET') {

  // GET RECENT PROJECTS BY A USER
  if(req.query.status === 'recent') {
  const recentProjects = await db.collection('projects').find({status: {$ne : 'Completed'}, "user.email": session.user.email}).sort({_id: -1}).toArray()
  if(!recentProjects){
  res.status(401).json({message: 'There are no projects for this user'})
  return
  }
  res.status(200).json({recentProjects: recentProjects})
  }

  // GET COMPLETED PROJECTS BY A USER
  if(req.query.status === 'completed') {
  const completedProjects = await db.collection('projects').find({status: {$eq : 'Completed'}, "user.email": session.user.email}).toArray()
  if(!completedProjects){
  res.status(401).json({message: 'There are no projects for this user'})
  return
  }
  client.close()
  const sortedCompletedProjects = completedProjects.sort((a, b) => b.updatedDate - a.updatedDate)
  res.status(200).json({completedProjects: sortedCompletedProjects})
  return
  }

  if(req.query.status === 'allrecent') {
    // GET ALL RECENT PROJECTS
    const allRecentProjects = await db.collection('projects').find({status: {$ne: 'Completed'}}).sort({_id: -1}).toArray()
    if(!allRecentProjects){
      res.status(401).json({message: 'There are no projects for this user'})
      return
    }
    client.close()
    res.status(200).json({allRecentProjects: allRecentProjects})
    }

    }

}