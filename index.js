const core = require("@actions/core");
const exec = require("@actions/exec");
const github = require("@actions/github");
  
async function run() {

    try {

        const { GITHUB_REF, GITHUB_SHA } = process.env;

        if (!GITHUB_REF) {
        core.setFailed("Missing GITHUB_REF");
        return;
        }

        if (!GITHUB_SHA) {
        core.setFailed("Missing GITHUB_SHA");
        return;
        }

        const octokit = new github.GitHub(core.getInput("github_token"));
        const newTag = core.getInput("new_tag");

        core.debug(`Pushing new tag to the repo`);

        const tagCreateResponse = await octokit.git.createRef({
          ...github.context.repo,
          ref: `refs/tags/${newTag}`,
          sha: GITHUB_SHA
        });
           
        console.log(tagCreateResponse)  
    } catch (error) {
        core.setFailed(error.message);
        console.log(error.message)    
    }
 }

run()