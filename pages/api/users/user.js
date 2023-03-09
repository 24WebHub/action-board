import { getSession } from "next-auth/react";
import connectToDB from "../../../lib/db";

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

 let savedUser;
 try {
  savedUser = await db.collection('users').findOne({email: session.user.email})
 } catch (error) {
  client.close()
  res.json(500).json({message: 'Something went wrong'})
 }
 const projectedUser = {email: savedUser.email, fullname: savedUser.fullname, _id: savedUser._id}
  client.close()
 res.status(200).json({user: projectedUser})
}