import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from '@/drizzle/schema';

import ws from 'ws';
import { env } from '@/env/server';

neonConfig.webSocketConstructor = ws;
const sql = neon(env.DATABASE_URL);
export const db = drizzle({ client: sql, schema });
