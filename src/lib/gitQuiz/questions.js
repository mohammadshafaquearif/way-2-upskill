export const QUESTIONS = [
  {
    "q": "What is the primary purpose of Git?",
    "options": [
      "To deploy applications directly to cloud servers",
      "To track changes in files and manage version history",
      "To monitor CPU and memory usage",
      "To provision cloud infrastructure"
    ]
  },
  {
    "q": "Which command creates a new Git repository in the current directory?",
    "options": [
      "`git clone`",
      "`git pull`",
      "`git init`",
      "`git start`"
    ]
  },
  {
    "q": "A developer modifies three files but wants to stage only `main.tf`. Which command should they use?",
    "options": [
      "`git add .`",
      "`git add main.tf`",
      "`git commit main.tf`",
      "`git push main.tf`"
    ]
  },
  {
    "q": "What does the `git status` command display?",
    "options": [
      "Only the complete commit history",
      "Only remote repository URLs",
      "Only deleted branches",
      "The state of the working tree and staging area"
    ]
  },
  {
    "q": "What is the purpose of the Git staging area?",
    "options": [
      "To prepare selected changes for the next commit",
      "To permanently publish code to GitHub",
      "To store cloud credentials",
      "To execute CI/CD pipelines"
    ]
  },
  {
    "q": "Which command displays commit history in a compact, one-line format?",
    "options": [
      "`git status --short`",
      "`git diff --short`",
      "`git log --oneline`",
      "`git branch --short`"
    ]
  },
  {
    "q": "What is the difference between Git and GitHub?",
    "options": [
      "Git is a cloud provider; GitHub is a programming language",
      "Git is a version control system; GitHub is a platform for hosting repositories and collaboration",
      "Git is a CI/CD tool; GitHub is an operating system",
      "Git and GitHub are identical products"
    ]
  },
  {
    "q": "What is the primary purpose of a `.gitignore` file?",
    "options": [
      "To delete committed files automatically",
      "To encrypt repository contents",
      "To prevent all users from accessing a branch",
      "To specify untracked files and paths Git should ignore"
    ]
  },
  {
    "q": "Which command creates a local copy of an existing remote repository?",
    "options": [
      "`git clone <repository-url>`",
      "`git init <repository-url>`",
      "`git commit <repository-url>`",
      "`git status <repository-url>`"
    ]
  },
  {
    "q": "What does `origin` usually represent in a cloned Git repository?",
    "options": [
      "The default local branch",
      "The first commit",
      "A default name for the remote repository",
      "The staging area"
    ]
  },
  {
    "q": "Why do developers use branches in Git?",
    "options": [
      "To eliminate the need for commits",
      "To create separate lines of development",
      "To encrypt files automatically",
      "To replace the remote repository"
    ]
  },
  {
    "q": "Which command creates and switches to a new branch named `feature/payment`?",
    "options": [
      "`git branch -d feature/payment`",
      "`git switch feature/payment`",
      "`git merge feature/payment`",
      "`git switch -c feature/payment`"
    ]
  },
  {
    "q": "Which command lists both local and remote-tracking branches?",
    "options": [
      "`git branch -a`",
      "`git branch -d`",
      "`git remote add`",
      "`git log --all`"
    ]
  },
  {
    "q": "What does `git merge feature/api` do when executed on the `main` branch?",
    "options": [
      "Deletes the `feature/api` branch",
      "Switches to `feature/api`",
      "Integrates changes from `feature/api` into the current branch",
      "Uploads the branch to GitHub"
    ]
  },
  {
    "q": "When can Git perform a fast-forward merge?",
    "options": [
      "Whenever two branches contain conflicting changes",
      "When the current branch tip can advance directly to the other branch tip without a divergent history",
      "Only when the repository has no commits",
      "Only when the merge target is a remote URL"
    ]
  },
  {
    "q": "What does `git merge --no-ff feature/login` do when run on `main` and a fast-forward would otherwise be possible?",
    "options": [
      "Deletes all commits on `main`",
      "Rebases `feature/login` automatically",
      "Cancels the merge",
      "Forces creation of a merge commit"
    ]
  },
  {
    "q": "What is the main difference between `git merge` and `git rebase`?",
    "options": [
      "Merge integrates branch histories; rebase reapplies commits onto a new base",
      "Merge uploads code; rebase downloads code",
      "Merge deletes branches; rebase creates GitHub repositories",
      "Merge stages files; rebase commits untracked files"
    ]
  },
  {
    "q": "A developer wants to delete a local branch only when Git considers it safely merged. Which command should they use?",
    "options": [
      "`git push origin --delete feature/api`",
      "`git branch -D feature/api`",
      "`git branch -d feature/api`",
      "`git clean -fd feature/api`"
    ]
  },
  {
    "q": "What is the difference between a GitHub fork and a Git branch?",
    "options": [
      "A fork is always local, while a branch is always hosted remotely",
      "A branch is a separate line of development in a repository; a fork is a separate repository copy on a hosting platform",
      "A fork contains no commit history",
      "A branch and fork are identical concepts"
    ]
  },
  {
    "q": "What is the main purpose of a pull request on GitHub?",
    "options": [
      "To install Git on a server",
      "To delete the source repository",
      "To automatically grant administrator access",
      "To propose changes for review and integration into another branch"
    ]
  },
  {
    "q": "A merge produces conflicts because two branches modify the same lines differently. What should the developer do?",
    "options": [
      "Review the conflicting code, resolve the intended result, stage the files, and complete the merge",
      "Run `git push --force` immediately",
      "Delete the `.git` directory",
      "Run `git clean -fd` to combine both changes"
    ]
  },
  {
    "q": "What does `git merge --abort` do during an ongoing merge when Git can restore the pre-merge state?",
    "options": [
      "Deletes the remote repository",
      "Publishes the conflicted merge",
      "Aborts the merge attempt and returns to the pre-merge state",
      "Removes every local branch"
    ]
  },
  {
    "q": "A developer needs one bug-fix commit from a development branch on a release branch. Which command is most suitable?",
    "options": [
      "`git merge development`",
      "`git cherry-pick <commit-hash>`",
      "`git branch -a`",
      "`git clean -fd`"
    ]
  },
  {
    "q": "A faulty commit has already been pushed to a shared production branch. Which command generally provides a history-preserving reversal?",
    "options": [
      "`git reset --hard HEAD~1`",
      "`git clean -fd`",
      "`git restore .`",
      "`git revert <commit-hash>`"
    ]
  },
  {
    "q": "What is the key difference between `git reset --soft HEAD~1` and `git reset --hard HEAD~1`?",
    "options": [
      "Soft reset keeps the changes staged; hard reset resets the index and working tree, discarding tracked changes from the removed commit's current state",
      "Both always delete the remote branch",
      "Soft reset uploads the commit; hard reset downloads it",
      "Hard reset preserves all staged changes while soft reset deletes them"
    ]
  },
  {
    "q": "A developer accidentally loses track of a recent local commit after moving a branch reference. Which command may help locate the previous HEAD position?",
    "options": [
      "`git clean`",
      "`git status`",
      "`git reflog`",
      "`git remote -v`"
    ]
  },
  {
    "q": "What is a detached HEAD state?",
    "options": [
      "A state in which all files are ignored",
      "A state in which HEAD points directly to a commit instead of a branch reference",
      "A state in which every remote branch is deleted",
      "A state in which Git cannot create commits"
    ]
  },
  {
    "q": "Which command is designed to show which commit last modified each line of a file?",
    "options": [
      "`git bisect`",
      "`git clean`",
      "`git stash`",
      "`git blame <file>`"
    ]
  },
  {
    "q": "Which Git feature helps locate a regression by repeatedly testing revisions between a known good and a known bad commit?",
    "options": [
      "`git bisect`",
      "`git tag`",
      "`git remote`",
      "`git stash`"
    ]
  },
  {
    "q": "A developer wants to remove a file from Git tracking while keeping the local file on disk. Which command is appropriate?",
    "options": [
      "`git rm file.txt`",
      "`git clean -fd`",
      "`git rm --cached file.txt`",
      "`git restore --worktree file.txt`"
    ]
  },
  {
    "q": "What is the difference between `git fetch` and `git pull`?",
    "options": [
      "Fetch deletes remote branches; pull creates them",
      "Fetch retrieves remote updates without integrating them; pull retrieves updates and integrates them into the current branch according to its configuration",
      "Fetch stages files; pull commits files",
      "Fetch and pull always have identical effects on the current branch"
    ]
  },
  {
    "q": "Which command lists the configured remote names and their URLs?",
    "options": [
      "`git branch -a`",
      "`git log --oneline`",
      "`git status`",
      "`git remote -v`"
    ]
  },
  {
    "q": "How can a developer delete a remote branch named `feature/old-api` from the remote called `origin`?",
    "options": [
      "`git push origin --delete feature/old-api`",
      "`git branch -d origin/feature/old-api`",
      "`git clean origin/feature/old-api`",
      "`git restore origin/feature/old-api`"
    ]
  },
  {
    "q": "Which command creates an annotated tag named `v2.0.0` with a release message?",
    "options": [
      "`git branch -a v2.0.0`",
      "`git commit -m \"v2.0.0\"`",
      "`git tag -a v2.0.0 -m \"Release 2.0.0\"`",
      "`git remote add v2.0.0`"
    ]
  },
  {
    "q": "What does `git diff --cached` display?",
    "options": [
      "Only untracked files",
      "Differences between staged changes and the current index baseline (HEAD by default)",
      "Only remote repository URLs",
      "Only branch names"
    ]
  },
  {
    "q": "Which command shows details and changes associated with a particular commit?",
    "options": [
      "`git remote -v`",
      "`git branch -d`",
      "`git clean -fd`",
      "`git show <commit-hash>`"
    ]
  },
  {
    "q": "What is a Git bare repository?",
    "options": [
      "A repository containing Git metadata and objects without a checked-out working tree",
      "A repository with no commits and no Git objects",
      "A repository containing only ignored files",
      "A repository that cannot receive pushes"
    ]
  },
  {
    "q": "Which Git object stores the contents of a file?",
    "options": [
      "Commit object",
      "Tag object",
      "Blob object",
      "Branch object"
    ]
  },
  {
    "q": "What is the purpose of Git hooks?",
    "options": [
      "To replace every remote repository",
      "To run scripts at specific Git lifecycle events, such as before a commit",
      "To encrypt all Git objects automatically",
      "To create cloud virtual machines directly"
    ]
  },
  {
    "q": "A team wants to combine several local commits into one before merging a feature. Which approach is commonly used?",
    "options": [
      "`git clean -fd`",
      "`git remote -v`",
      "`git fetch --all`",
      "Interactive rebase with `git rebase -i` and squash/fixup operations"
    ]
  },
  {
    "q": "A GitHub Actions workflow should run when commits are pushed to `main`. Which trigger is appropriate?",
    "options": [
      "A `push` event with a `main` branch filter",
      "A scheduled event only",
      "A manual trigger only",
      "A release deletion event"
    ]
  },
  {
    "q": "A CI pipeline builds a Docker image from a repository. Why should the pipeline normally check out the intended commit before building?",
    "options": [
      "To automatically encrypt every Docker layer",
      "To avoid storing any build logs",
      "To ensure the build uses the intended source revision and is reproducible",
      "To prevent the repository from having branches"
    ]
  },
  {
    "q": "A Terraform change is submitted through a pull request. What is a useful CI check before approving the change?",
    "options": [
      "Delete the Terraform state file",
      "Run appropriate formatting, validation, and a reviewed plan where the environment supports it",
      "Force-push the branch without reviewing changes",
      "Disable all required checks"
    ]
  },
  {
    "q": "A production deployment must correspond to a specific tested application version. Which Git practice helps identify the source revision for that release?",
    "options": [
      "Commit all generated logs",
      "Delete the release branch immediately",
      "Use only uncommitted local changes",
      "Create and maintain a release tag associated with the intended commit"
    ]
  },
  {
    "q": "A public repository accepts pull requests from forks. What is the safest default assumption about repository secrets in workflows triggered by those pull requests?",
    "options": [
      "Repository secrets are not passed to fork-originated pull-request workflows by default",
      "All repository and organization secrets are automatically available",
      "Secrets are automatically committed to the fork",
      "Fork contributors automatically receive repository administrator access"
    ]
  },
  {
    "q": "A company wants to prevent direct changes to its production branch and require reviews before merging. Which solution is most appropriate?",
    "options": [
      "Add a local Git alias for `git push`",
      "Put the branch name in `.gitignore`",
      "Configure branch protection or repository rules with required reviews and checks",
      "Create an extra local branch on every developer machine"
    ]
  },
  {
    "q": "A CI pipeline needs to authenticate to GitHub to access a private repository. Which approach is generally preferable?",
    "options": [
      "Commit a personal access token into the source code",
      "Use an appropriately scoped credential or GitHub Actions token, stored and permissioned securely",
      "Put the credential in a public README file",
      "Disable authentication on the repository"
    ]
  },
  {
    "q": "A deployment pipeline should publish an artifact only after the required tests succeed. Which design best supports this requirement?",
    "options": [
      "Run deployment before tests and ignore failures",
      "Delete test reports after every run",
      "Deploy from any developer's uncommitted local directory",
      "Gate the deployment job on successful required test jobs"
    ]
  },
  {
    "q": "A Terraform repository accidentally contains a committed cloud access key. What should the team do?",
    "options": [
      "Revoke or rotate the exposed credential, investigate its use, and remove it from source while addressing repository history as appropriate",
      "Rename the key file and leave the credential active",
      "Add the same key to a second public file",
      "Assume `.gitignore` automatically removes the committed secret"
    ]
  },
  {
    "q": "A team wants to run a deployment workflow only after a release is published on GitHub. Which event is designed for this purpose?",
    "options": [
      "`delete` only",
      "`issues` only",
      "`release` with an appropriate published activity type",
      "`watch` only"
    ]
  },
  {
    "q": "A developer accidentally committed a secret locally but has not pushed the commit. What should they do before sharing the branch?",
    "options": [
      "Push the secret and remove it in a later commit",
      "Remove the secret from the tracked content, rotate it if it is a real credential, and correct the local commit history before pushing",
      "Rename the repository",
      "Add the secret to `.gitignore` without changing the committed content"
    ]
  },
  {
    "q": "A developer wants to temporarily inspect an older commit without switching to a named branch. Which command can check out that commit directly?",
    "options": [
      "`git remote <commit-hash>`",
      "`git clean <commit-hash>`",
      "`git push <commit-hash>`",
      "`git switch --detach <commit-hash>`"
    ]
  },
  {
    "q": "A developer runs `git reset --hard HEAD~1` on a local branch. Which statement best describes the potential impact?",
    "options": [
      "The branch moves back one commit and tracked index/working-tree state is reset, potentially discarding tracked changes",
      "The previous commit is automatically reverted through a new commit",
      "All remote branches are deleted",
      "The command only removes untracked files"
    ]
  },
  {
    "q": "A developer needs to inspect uncommitted changes that have not yet been staged. Which command normally shows those differences?",
    "options": [
      "`git diff --cached`",
      "`git tag -l`",
      "`git diff`",
      "`git remote -v`"
    ]
  },
  {
    "q": "A team wants to transfer Git commits and references between disconnected environments without using a network remote. Which Git feature is designed for this?",
    "options": [
      "`git blame`",
      "`git bundle`",
      "`git status`",
      "`git clean`"
    ]
  },
  {
    "q": "A developer wants to download updates from all configured remote repositories without merging them into the current branch. Which command is appropriate?",
    "options": [
      "`git pull --all`",
      "`git push --all`",
      "`git merge --all`",
      "`git fetch --all`"
    ]
  },
  {
    "q": "A team wants to keep large binary assets out of normal Git object storage while maintaining versioned pointers in the repository. Which technology is designed for this?",
    "options": [
      "Git LFS",
      "`.gitignore` alone",
      "`git stash`",
      "Git hooks alone"
    ]
  },
  {
    "q": "A developer accidentally stages a file containing local environment settings. They want to remove it from staging without losing the file's contents. Which command should they use?",
    "options": [
      "`git reset --hard`",
      "`git clean -fd`",
      "`git restore --staged .env`",
      "`git rm .env`"
    ]
  },
  {
    "q": "A developer rebases a feature branch that has already been shared with teammates. What is the main risk?",
    "options": [
      "Git automatically deletes the entire remote repository",
      "Rebase can rewrite commit identities, potentially disrupting collaborators who depend on the old history",
      "The branch becomes a bare repository",
      "All tags become encrypted"
    ]
  },
  {
    "q": "A team wants to maintain a reliable Git workflow for cloud infrastructure and production applications. Which approach is the strongest overall practice?",
    "options": [
      "Commit credentials directly and allow unrestricted pushes to production",
      "Deploy unreviewed local changes without recording the source revision",
      "Force-push shared branches whenever conflicts occur",
      "Use version-controlled changes, pull-request reviews, automated checks, secure credentials, release references, and a controlled deployment process"
    ]
  }
];

export const MARKS_PER_QUESTION = 1;
export const TOTAL_MARKS = QUESTIONS.length * MARKS_PER_QUESTION;
export const OPTION_LABELS = ["A", "B", "C", "D"];

/* obfuscated answer payload — not human-readable in sources */
export const ANSWER_PAYLOAD = "W2NpbHZ/hYiSm6Gkrre9wMrT2dzm7/X4AgsRFB4nLTA6Q0lMVl9laHJ7gYSOl52gqrO5vMbP1dji6/H0";
