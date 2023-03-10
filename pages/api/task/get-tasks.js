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
      res.status(500).json({message: 'Could not fetch data from the server'})
      return
    }

  
  const db = client.db()

  if(req.method === 'GET') {

  // GET RECENT PROJECTS BY A USER

  const myRecentProjects = await db.collection('projects').find({status: {$ne : 'Completed'}, "user.email": session.user.email}).toArray()
  if(!myRecentProjects){
  res.status(401).json({message: 'There are no tasks for this user'})
  client.close()
  return
  }
  client.close()
  const myRecentProjectwithTasks = myRecentProjects.filter(myRecentProjectwithTask => myRecentProjectwithTask.tasks.length > 0)
    

function filteredArray(arr, filter) {
  const results = [];
  arr.map(myRecentProjectwithTask => {
    const project = myRecentProjectwithTask.title
    myRecentProjectwithTask.tasks.map(recentTask => {
      if(recentTask.status === filter) {
        const taskObj = {...recentTask, project}
        results.push(taskObj)
      }
    })

  })

  return results
}

if(req.query.status === 'todo') {
 const filteredTasks = filteredArray(myRecentProjectwithTasks, 'To Do' )
 if(filteredTasks.length > 0 ) {
  const sortedById = filteredTasks.sort(function(a, b) {
    return b._id.toString().localeCompare(a._id.toString());
  });
 res.status(200).json({myTodoTasks: sortedById})
 return
 }
res.status(422).json({message: "No 'To Do' tasks to display"})
  }


  if(req.query.status === 'inprogress') {
  const filteredTask = filteredArray(myRecentProjectwithTasks, 'In Progress' )
  if(filteredTask.length > 0) {
    const sortedUpdatedDate = filteredTask.sort(function(a, b) {
      return b.updatedDate - a.updatedDate
    })
        res.status(200).json({myInprogressTasks: sortedUpdatedDate})
        return 
  }
  res.status(422).json({message: "No 'In Progress 'tasks to display"})
  }

  if(req.query.status === 'completed') {
  const filteredTask = filteredArray(myRecentProjectwithTasks, 'Completed' )
  if(filteredTask.length > 0) {
    const sortedUpdatedDate = filteredTask.sort(function(a, b) {
      return b.updatedDate - a.updatedDate
    })
        res.status(200).json({myCompletedTasks: sortedUpdatedDate})
        return
  }
  res.status(422).json({message: "No 'Completed' tasks to display"})
  }


// console.log(filteredTasks)
  // console.log(myRecentProjectWithTodoTasks)
// ////////////////////////////////////////////////
//  const extractedTasks =  myRecentProjectwithTasks.map(myRecentProject=>myRecentProject.tasks )

//  function extractArrayItems (arr) {
//   const combinedArray = []
//   for(let items of arr) {
//   combinedArray.push(...items)
//   }
//   return combinedArray
// }

// const tasks =extractArrayItems(extractedTasks)

// const sortedUpdatedDate = tasks.sort(function(a, b) {
//   return b.updatedDate - a.updatedDate
// })

// if(req.query.status === 'todo') {
//   const sortedTasks = tasks.sort(function(a, b) {
//     return b._id.toString().localeCompare(a._id.toString());
//   });
//  const myTodoTasks = sortedTasks.filter(task => task.status === 'To Do')
//  res.status(200).json({myTodoTasks: myTodoTasks})
//   }

//   if(req.query.status === 'inprogress') {
//     const myInprogressTasks = sortedUpdatedDate.filter(task => task.status === 'In Progress')
//     res.status(200).json({myInprogressTasks: myInprogressTasks})
//   }

//   if(req.query.status === 'completed') {
//   const myCompletedTasks = sortedUpdatedDate.filter(task => task.status === 'Completed')
//   res.status(200).json({myCompletedTasks: myCompletedTasks})
//   }

    }
}