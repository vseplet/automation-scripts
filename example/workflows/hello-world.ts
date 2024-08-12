// deno-lint-ignore-file require-await
import { ContextPot, CoreStartPot, workflow } from "../../deps.ts";

class CTX extends ContextPot<{
  name: string;
}> {
  data = {
    name: "Vsevolod Pletnev",
  };
}

const helloWorld = workflow(CTX)
  .name("Hello World Workflow")
  .on(CoreStartPot, (_pot) => new CTX())
  .sq(({ task }) =>
    task()
      .name("Workflow Task")
      .do(async ({ ctx, log, finish, fail }) => {
        log.inf(`Hello, ${ctx.data.name}!`);
        if (Math.random() > 0.5) return fail("random!");
        return finish();
      })
  );

export default helloWorld;
