import { Surreal } from 'surrealdb';
import * as dotenv from 'dotenv';

dotenv.config();

export function unwrap<T = any>(queryResult: any): T {
  return queryResult?.[0]?.[0] ?? null;
}

export async function createSurrealConnection(): Promise<Surreal> {
  const db = new Surreal();
  await db.connect(
    'ws://localhost:8000/rpc',
    //'wss://tellcast-06boonlsk5t0rdhoihiaja32ds.aws-euw1.surreal.cloud',
  );

  await db.signin({
    username: 'root', //process.env.SURREALDB_USER!,
    password: 'root', //process.env.SURREALDB_PASSWORD!,
  });

  await db.use({
    namespace: 'public',
    database: 'tellcast',
  });

  return db;
}
