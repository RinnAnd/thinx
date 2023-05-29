import { createTRPCRouter } from "~/server/api/trpc";
import { thinxRouter } from "~/server/api/routers/thinx";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  thinx: thinxRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
