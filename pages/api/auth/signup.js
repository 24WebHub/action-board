import connectToDB from '../../../lib/db';

import {hashPassword } from '../../../lib/auth';

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const {fullname, email, password} = req.body;

    if(!fullname || fullname.trim() === '' ||!email ||!email.trim() === '' ||!password || password.trim() === '')  {
      res.status(422).json({message: 'Please fill all value properly'})
      return 
    }

    if(password.trim().length < 8 ) {
      res.status(423).json({message: 'Password length must be more than eight character'})
      return
    }

 
  let client;
    try {
       client = await connectToDB()
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database failed'})
    }

    const db = client.db()

  try {
    const existingUser = await db.collection('users').findOne({email: email})
    if(existingUser) {
      res.status(422).json({message: "User exist already!"})
      return
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'The application encounter issues connecting to server'})
    return
  }

  const hashedPassword = await hashPassword(password)
  
  let result;
  try {
     result = await db.collection('users').insertOne({
      fullname: fullname, 
      email: email, 
      password: hashedPassword, 
    })
  } catch (error) {
    res.status(500).json({message: 'Inserting  data failed'})
    return;
  }
  client.close()
    res.status(200).json({ message: "Account created successfully!", createdUser: {  fullname: fullname, 
      email: email, 
      id: result.insertedId}})
   }
  }