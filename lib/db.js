import {MongoClient} from 'mongodb';

export default async function connectToDB() {

   const client = await MongoClient.connect(process.env.DATABASE_URL);

  //  const client = await MongoClient.connect('mongodb+srv://ogbeem:ogbeem123@ab01local.olvmmpk.mongodb.net/actionboard-local?retryWrites=true&w=majority');

  return client
}

//