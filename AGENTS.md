# Repository workflow

This repository is maintained by one person. The human owner may push directly to `main`.

AI agents must never push directly to `main`. For every change, an AI agent must:

1. Create a dedicated working branch from the latest `main`.
2. Commit and push changes only to that branch.
3. Open a pull request targeting `main`.
4. Leave merging to the human owner unless the human explicitly asks the agent to merge that specific pull request.

Do not weaken, remove, or bypass this rule unless the human owner explicitly requests a workflow change.

Before opening a pull request, run `npm run build` and report the result in the pull request description.
