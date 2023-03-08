import {MongoClient} from 'mongodb';

export default async function connectToDB() {
  // const connectionUrl =`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  // const connectionUrl = 'mongodb+srv://ogbeem:ogbeem123@ab01local.olvmmpk.mongodb.net/actionboard-local?retryWrites=true&w=majority'
  // const connectionUrl = process.env.DATABASE_URL
  

   const client = await MongoClient.connect(process.env.DATABASE_URL);

  return client
}

