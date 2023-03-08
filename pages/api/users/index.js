// import { getSession } from 'next-auth/react';
// import connectToDB from '../../../lib/db';

// export default async function handler(req, res) {
//   if(req.method === 'GET') {

//    // Authenticate User Session
//  const session = await getSession({req: req})

//  if(!session) {
//    res.status(401).json({message: 'Not authenicated'})
//    return
//  }

// //  Connect to DB
//   let client;
//   try {
//      client = await connectToDB()
//   } catch (error) {
//     res.status(500).json({message: 'Connection to the database failed'})
//     return
//   }

//   const db = client.db()

//   const users = await db.collection('users').find().toArray()
//   if(!users){
//     client.close()
//     res.status(401).json({message: 'There are not recent users at this time'})
//     return
//   }
  
//   client.close()
//   res.status(200).json({users: users})
//   }
// }