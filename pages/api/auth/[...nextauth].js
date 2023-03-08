import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from '../../../lib/auth';
import connectToDB from '../../../lib/db';

const authOptions = {
      session: {
        strategy: 'jwt'
      },
      providers: [
        CredentialsProvider({
          async authorize(credentials) {
          const {email, password} = credentials

          let client;
          try {
             client = await connectToDB()
          } catch (error) {
            throw new Error('Connecting to the database failed')
          }

        const db = client.db()
    
          const user = await db.collection('users').findOne({email: email})
        if(!user) {
          client.close()
          throw new Error ('No user found')
        }

        const isValid = await verifyPassword(password, user.password)

        if(!isValid){
          client.close()
          throw new Error('Invalid password')
      }

      client.close()
      return {email: user.email};

          },
        }),
      ], 
      pages: {
        signIn: '../../pages/login',
        // error: '../.../pages/dashboard',
        // signOut: 'auth/signout'
      }
}

export default NextAuth(authOptions)