import { ContextPot, core, sh, TaskBuilder } from "../../deps.ts";

export const checkUpdateTypeByCommitMessage = <
  CTX extends ContextPot<{
    updateType: string;
  }>,
>(
  contextPot: new () => CTX,
  nextTask?: TaskBuilder<CTX>,
) =>
  core.task(contextPot)
    .name("checkUpdateTypeByCommitMessage")
    .do(async ({ pots, log, next, finish }) => {
      const ctx = pots[0].data;

      const lastCommitText = (await sh("git log -1 --pretty=%B")).stdout;
      if (lastCommitText.indexOf("[major]") != -1) {
        ctx.updateType = "major";
      } else if (lastCommitText.indexOf("[minor]") != -1) {
        ctx.updateType = "minor";
      } else if (lastCommitText.indexOf("[patch]") != -1) {
        ctx.updateType = "patch";
      }

      log.inf(ctx.updateType);
      if (nextTask) {
        return next(nextTask, {
          updateType: ctx.updateType,
        });
      } else {
        return finish();
      }
    });
