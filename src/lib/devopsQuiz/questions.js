export const QUESTIONS = [
  {
    "q": "Which command shows the current working directory?",
    "options": [
      "ls",
      "pwd",
      "cd",
      "cat"
    ]
  },
  {
    "q": "Which command lists files and folders in a directory?",
    "options": [
      "ls",
      "cd",
      "pwd",
      "touch"
    ]
  },
  {
    "q": "Which command is used to create a new directory?",
    "options": [
      "touch",
      "mkdir",
      "cd",
      "rm"
    ]
  },
  {
    "q": "Which command creates a new empty file?",
    "options": [
      "touch",
      "mkdir",
      "nano",
      "cat"
    ]
  },
  {
    "q": "Which command is used to change the current directory?",
    "options": [
      "pwd",
      "ls",
      "cd",
      "mv"
    ]
  },
  {
    "q": "Which command displays the content of a file?",
    "options": [
      "echo",
      "cat",
      "touch",
      "vi"
    ]
  },
  {
    "q": "Which command is used to print text on the terminal or write text into a file?",
    "options": [
      "cat",
      "echo",
      "nano",
      "pwd"
    ]
  },
  {
    "q": "Which command opens the Nano text editor?",
    "options": [
      "vi",
      "nano",
      "cat",
      "touch"
    ]
  },
  {
    "q": "Which command opens the Vi text editor?",
    "options": [
      "nano",
      "vi",
      "cat",
      "echo"
    ]
  },
  {
    "q": "Which command is used to copy files?",
    "options": [
      "mv",
      "cp",
      "rm",
      "cat"
    ]
  },
  {
    "q": "Which command is used to move or rename files?",
    "options": [
      "cp",
      "mv",
      "rm",
      "touch"
    ]
  },
  {
    "q": "Which command deletes files?",
    "options": [
      "rmdir",
      "rm",
      "mv",
      "cp"
    ]
  },
  {
    "q": "Which command deletes only empty directories?",
    "options": [
      "rm",
      "rm -r",
      "rmdir",
      "mkdir"
    ]
  },
  {
    "q": "Which command is used to delete a non-empty directory along with its contents?",
    "options": [
      "rmdir",
      "rm -r",
      "mv",
      "cp"
    ]
  },
  {
    "q": "Which git command uploads local commits to a remote repository?",
    "options": [
      "git clone",
      "git pull",
      "git push",
      "git fetch"
    ]
  },
  {
    "q": "Which git command downloads changes from a remote repository and merges them into the current branch?",
    "options": [
      "git push",
      "git pull",
      "git clone",
      "git branch"
    ]
  },
  {
    "q": "Which git command is used to download a complete copy of a remote repository for the first time?",
    "options": [
      "git pull",
      "git clone",
      "git push",
      "git init"
    ]
  },
  {
    "q": "Which command is used to create a new branch in Git?",
    "options": [
      "git branch <name>",
      "git checkout -m <name>",
      "git commit <name>",
      "git merge <name>"
    ]
  },
  {
    "q": "Which command switches to a different existing branch?",
    "options": [
      "git branch",
      "git checkout",
      "git push",
      "git clone"
    ]
  },
  {
    "q": "What is the purpose of branching in Git?",
    "options": [
      "To delete old commits",
      "To work on features independently without affecting the main code",
      "To upload the code to GitHub",
      "To compress files"
    ]
  },
  {
    "q": "Which command records staged changes with a message into the local repository history?",
    "options": [
      "git add",
      "git commit",
      "git push",
      "git clone"
    ]
  },
  {
    "q": "Which command is used to stage changes before committing them?",
    "options": [
      "git commit",
      "git add",
      "git push",
      "git pull"
    ]
  },
  {
    "q": "What does `git init` do?",
    "options": [
      "Uploads a repository to GitHub",
      "Initializes a new local Git repository",
      "Deletes a repository",
      "Clones a repository"
    ]
  },
  {
    "q": "What is GitHub mainly used for?",
    "options": [
      "Writing Java code only",
      "Hosting and collaborating on Git repositories online",
      "Running Jenkins pipelines",
      "Configuring servers"
    ]
  },
  {
    "q": "Which GitHub feature is used to propose and review code changes before merging into the main branch?",
    "options": [
      "Issue",
      "Pull Request",
      "Wiki",
      "Release"
    ]
  },
  {
    "q": "Which GitHub feature allows tracking bugs, tasks, and enhancement requests?",
    "options": [
      "Pull Request",
      "Actions",
      "Issues",
      "Fork"
    ]
  },
  {
    "q": "What is Maven mainly used for in a Java project?",
    "options": [
      "Version control",
      "Build automation and dependency management",
      "Server configuration",
      "Continuous monitoring"
    ]
  },
  {
    "q": "Which Maven file contains project configuration, dependencies, and plugins?",
    "options": [
      "build.xml",
      "pom.xml",
      "settings.json",
      "maven.cfg"
    ]
  },
  {
    "q": "Which Maven command compiles, tests, and packages the project into a JAR/WAR file?",
    "options": [
      "mvn install",
      "mvn clean",
      "mvn package",
      "mvn deploy only"
    ]
  },
  {
    "q": "Which Maven command removes previously compiled files and build artifacts?",
    "options": [
      "mvn clean",
      "mvn package",
      "mvn test",
      "mvn compile"
    ]
  },
  {
    "q": "What is a Jenkins Freestyle project mainly used for?",
    "options": [
      "Writing infrastructure as code",
      "Creating a simple, UI-configured build/automation job",
      "Managing Kubernetes clusters",
      "Hosting Git repositories"
    ]
  },
  {
    "q": "In a Jenkins Freestyle project, where do you configure the source code repository?",
    "options": [
      "Build Triggers section",
      "Source Code Management section",
      "Post-build Actions",
      "Pipeline script"
    ]
  },
  {
    "q": "Which Jenkins section is used to define what happens automatically after a build finishes (e.g., sending notifications)?",
    "options": [
      "Build Triggers",
      "Source Code Management",
      "Post-build Actions",
      "Build Environment"
    ]
  },
  {
    "q": "Which Jenkins feature allows a Freestyle job to start automatically when new code is pushed to the repository?",
    "options": [
      "Post-build Actions",
      "Build Triggers (e.g., webhook/poll SCM)",
      "Build Environment",
      "Parameters"
    ]
  },
  {
    "q": "What is a Jenkins Pipeline mainly used for?",
    "options": [
      "Manual one-time builds only",
      "Defining the entire build/deploy process as code",
      "Hosting source code",
      "Editing files"
    ]
  },
  {
    "q": "Which file is commonly used to define a Jenkins Pipeline as code?",
    "options": [
      "pom.xml",
      "Jenkinsfile",
      "Dockerfile",
      "build.yml"
    ]
  },
  {
    "q": "Which of the following is a Jenkins Pipeline syntax style with a simplified, structured format?",
    "options": [
      "Freestyle syntax",
      "Declarative Pipeline",
      "Waterfall syntax",
      "YAML-only syntax"
    ]
  },
  {
    "q": "In a Jenkins Pipeline, what is a \"stage\" used for?",
    "options": [
      "To store credentials",
      "To represent a distinct phase of the pipeline, like Build, Test, or Deploy",
      "To configure SSH keys",
      "To create a new branch"
    ]
  },
  {
    "q": "What is the primary goal of DevOps?",
    "options": [
      "To separate development and operations teams completely",
      "To improve collaboration between development and operations for faster, reliable delivery",
      "To eliminate testing",
      "To replace all manual work with hardware"
    ]
  },
  {
    "q": "Which of the following is a key DevOps practice?",
    "options": [
      "Manual deployments only",
      "Continuous Integration and Continuous Delivery (CI/CD)",
      "Avoiding automation",
      "Working in isolated silos"
    ]
  },
  {
    "q": "What does CI (Continuous Integration) mainly focus on?",
    "options": [
      "Deploying to production without testing",
      "Frequently merging and testing code changes into a shared repository",
      "Writing documentation only",
      "Manual code review only"
    ]
  },
  {
    "q": "What does CD commonly stand for in the CI/CD DevOps pipeline context?",
    "options": [
      "Code Development",
      "Continuous Delivery/Deployment",
      "Central Database",
      "Code Distribution"
    ]
  },
  {
    "q": "What is a key characteristic of the Waterfall model in software development?",
    "options": [
      "Iterative and flexible development",
      "Sequential phases where each phase must complete before the next begins",
      "Continuous deployment of small changes",
      "No documentation required"
    ]
  },
  {
    "q": "Which of the following is a common drawback of the Waterfall model?",
    "options": [
      "Too much collaboration",
      "Difficult to accommodate changes once a phase is completed",
      "Too fast for large projects",
      "No planning required"
    ]
  },
  {
    "q": "In the Waterfall model, which phase typically comes first?",
    "options": [
      "Testing",
      "Requirements gathering/analysis",
      "Deployment",
      "Maintenance"
    ]
  },
  {
    "q": "What is SSH mainly used for?",
    "options": [
      "Compressing files",
      "Securely connecting to and managing remote servers",
      "Managing Jenkins jobs",
      "Creating Git branches"
    ]
  },
  {
    "q": "Which SSH-related file typically stores a user's public keys for passwordless authentication on a remote server?",
    "options": [
      "known_hosts only",
      "authorized_keys",
      "config.yml",
      "id_rsa.pub only, never used remotely"
    ]
  },
  {
    "q": "What is Ansible mainly used for in DevOps?",
    "options": [
      "Version control",
      "Configuration management and automation of IT tasks",
      "Building Java projects",
      "Hosting code repositories"
    ]
  },
  {
    "q": "Which file in Ansible lists the remote servers/hosts to be managed?",
    "options": [
      "playbook.yml",
      "inventory file",
      "ansible.cfg only",
      "Jenkinsfile"
    ]
  },
  {
    "q": "What is an Ansible Playbook?",
    "options": [
      "A single shell command",
      "A YAML file that defines a set of automation tasks to run on managed hosts",
      "A Jenkins plugin",
      "A Git branch"
    ]
  },
  {
    "q": "You are in /home/user and want to know your exact current location before running a script. Which command helps you confirm your current directory?",
    "options": [
      "ls",
      "pwd",
      "cd",
      "touch"
    ]
  },
  {
    "q": "Your teammate asks you to check what files exist in the current project folder before making changes. Which command will you use?",
    "options": [
      "pwd",
      "ls",
      "mkdir",
      "rm"
    ]
  },
  {
    "q": "You need to create a new folder called \"logs\" to store application logs. Which command would you run?",
    "options": [
      "touch logs",
      "mkdir logs",
      "cd logs",
      "rm logs"
    ]
  },
  {
    "q": "You want to quickly create an empty file named \"config.txt\" to edit later. Which command is correct?",
    "options": [
      "mkdir config.txt",
      "touch config.txt",
      "cat config.txt",
      "cd config.txt"
    ]
  },
  {
    "q": "You are inside /var/www and need to move into the /var/log directory. Which command do you use?",
    "options": [
      "pwd",
      "ls",
      "cd /var/log",
      "mkdir /var/log"
    ]
  },
  {
    "q": "A teammate shares a script file and asks you to quickly check its contents in the terminal without opening an editor. Which command helps?",
    "options": [
      "echo",
      "cat",
      "mkdir",
      "rmdir"
    ]
  },
  {
    "q": "You want to write the text \"Deployment Successful\" into a log file called deploy.log. Which command would you use?",
    "options": [
      "cat \"Deployment Successful\" > deploy.log",
      "echo \"Deployment Successful\" > deploy.log",
      "touch \"Deployment Successful\"",
      "mv \"Deployment Successful\" deploy.log"
    ]
  },
  {
    "q": "You need to quickly edit a config file using an editor known for being simple and beginner-friendly compared to modal editors. Which editor would you use?",
    "options": [
      "nano",
      "vi",
      "touch",
      "cat"
    ]
  },
  {
    "q": "You want to edit a config file using an editor that experienced Linux admins often use for advanced modal editing directly on production servers. Which editor are they most likely using?",
    "options": [
      "nano",
      "vi",
      "touch",
      "cat"
    ]
  },
  {
    "q": "You need to copy a configuration file to keep a backup before editing it. Which command should you use?",
    "options": [
      "mv config.yml config_backup.yml",
      "cp config.yml config_backup.yml",
      "rm config.yml",
      "cat config.yml"
    ]
  },
  {
    "q": "You want to rename a file from \"old_script.sh\" to \"deploy_script.sh\". Which command would you use?",
    "options": [
      "cp old_script.sh deploy_script.sh",
      "mv old_script.sh deploy_script.sh",
      "rm old_script.sh",
      "touch deploy_script.sh"
    ]
  },
  {
    "q": "After testing, you realize a temporary file \"temp.txt\" is no longer needed. Which command deletes it?",
    "options": [
      "rmdir temp.txt",
      "rm temp.txt",
      "mv temp.txt",
      "cp temp.txt"
    ]
  },
  {
    "q": "You try to delete a folder called \"old_build\" using rmdir but it fails because the folder isn't actually empty. What should you use instead?",
    "options": [
      "rm old_build",
      "rm -r old_build",
      "mkdir old_build",
      "touch old_build"
    ]
  },
  {
    "q": "You finished cleaning a project and now want to remove an empty folder called \"temp_cache\". Which command is appropriate?",
    "options": [
      "rmdir temp_cache",
      "rm -r temp_cache",
      "mv temp_cache",
      "cp temp_cache"
    ]
  },
  {
    "q": "You finished your local commits and want to upload them to your team's shared GitHub repository. Which command do you use?",
    "options": [
      "git pull",
      "git clone",
      "git push",
      "git branch"
    ]
  },
  {
    "q": "Your teammate made changes to the repository and you want to update your local copy with those changes. Which command should you run?",
    "options": [
      "git push",
      "git pull",
      "git clone",
      "git branch"
    ]
  },
  {
    "q": "You're joining a new project and need to get a full local copy of the team's GitHub repository for the first time. Which command do you use?",
    "options": [
      "git pull",
      "git clone",
      "git push",
      "git init"
    ]
  },
  {
    "q": "You want to work on a new \"login-feature\" without affecting the main codebase. What should you create first?",
    "options": [
      "A new repository",
      "A new branch",
      "A pull request",
      "A commit"
    ]
  },
  {
    "q": "You've created a \"login-feature\" branch and now want to start working on it. Which command switches you to that branch?",
    "options": [
      "git branch login-feature",
      "git checkout login-feature",
      "git push login-feature",
      "git clone login-feature"
    ]
  },
  {
    "q": "Two developers are working on different features from the same codebase without interfering with each other's work. What Git concept enables this?",
    "options": [
      "Cloning",
      "Branching",
      "Pull requests only",
      "Compression"
    ]
  },
  {
    "q": "You've made changes to a file and want to save them permanently in your local repository history with a message describing the change. Which command should you use?",
    "options": [
      "git add",
      "git commit -m \"message\"",
      "git push",
      "git clone"
    ]
  },
  {
    "q": "Before committing your changes, you need to mark specific modified files as ready to be included in the next commit. Which command do you use?",
    "options": [
      "git commit",
      "git add",
      "git push",
      "git pull"
    ]
  },
  {
    "q": "You're starting a brand-new project on your laptop and want to set it up as a Git repository from scratch. Which command should you run first?",
    "options": [
      "git clone",
      "git init",
      "git push",
      "git branch"
    ]
  },
  {
    "q": "Your team wants a central online platform to store, share, and collaborate on their Git repository. Which platform would they typically use?",
    "options": [
      "Jenkins",
      "GitHub",
      "Maven",
      "Ansible"
    ]
  },
  {
    "q": "A developer has finished a feature and wants their team to review the code before it gets merged into the main branch. What should they open on GitHub?",
    "options": [
      "An Issue",
      "A Pull Request",
      "A Wiki page",
      "A Release"
    ]
  },
  {
    "q": "Your team wants to track a reported bug so it isn't forgotten before the next release. What GitHub feature should they use?",
    "options": [
      "Pull Request",
      "Fork",
      "Issue",
      "Action"
    ]
  },
  {
    "q": "Your Java project has multiple external libraries and you want a tool to automatically manage these dependencies and build steps. Which tool would you use?",
    "options": [
      "Git",
      "Maven",
      "SSH",
      "Ansible"
    ]
  },
  {
    "q": "You need to check which dependencies and plugins are configured for your Maven project. Which file should you open?",
    "options": [
      "Jenkinsfile",
      "pom.xml",
      "inventory",
      "config.yml"
    ]
  },
  {
    "q": "You want to compile, run tests, and generate a deployable JAR file for your Java project in one command. Which Maven command should you run?",
    "options": [
      "mvn clean",
      "mvn package",
      "mvn test",
      "mvn init"
    ]
  },
  {
    "q": "Before rebuilding your project, you want to remove old compiled files to avoid conflicts. Which Maven command should you run first?",
    "options": [
      "mvn install",
      "mvn clean",
      "mvn package",
      "mvn compile"
    ]
  },
  {
    "q": "You want to quickly set up a basic Jenkins job using the UI, without writing any pipeline code, to build a small internal tool. What type of Jenkins project would you create?",
    "options": [
      "Pipeline project",
      "Freestyle project",
      "Multibranch project",
      "Folder"
    ]
  },
  {
    "q": "While configuring a Freestyle job, you need to tell Jenkins where your GitHub repository is located so it can pull the code. Which section should you configure?",
    "options": [
      "Build Triggers",
      "Source Code Management",
      "Post-build Actions",
      "Build Environment"
    ]
  },
  {
    "q": "After a Freestyle build finishes, you want Jenkins to automatically send a notification email to the team. Where would you configure this?",
    "options": [
      "Source Code Management",
      "Build Triggers",
      "Post-build Actions",
      "Parameters"
    ]
  },
  {
    "q": "You want your Freestyle job to start automatically every time new code is pushed to the repository, instead of running it manually. What should you configure?",
    "options": [
      "Post-build Actions",
      "Build Triggers",
      "Source Code Management",
      "Build Environment"
    ]
  },
  {
    "q": "Your team wants the entire build-test-deploy process defined as version-controlled code rather than manual UI clicks. What Jenkins feature should they use?",
    "options": [
      "Freestyle project",
      "Jenkins Pipeline",
      "Multibranch folder only",
      "Build Triggers"
    ]
  },
  {
    "q": "You want to store your pipeline's build-test-deploy steps as a file inside your Git repository. What is this file typically called?",
    "options": [
      "pom.xml",
      "Jenkinsfile",
      "config.yml",
      "inventory"
    ]
  },
  {
    "q": "Your DevOps lead wants the pipeline written in a clean, structured format that's easier for beginners to read compared to raw scripted syntax. Which pipeline style should be used?",
    "options": [
      "Freestyle syntax",
      "Declarative Pipeline",
      "Waterfall syntax",
      "YAML CI syntax"
    ]
  },
  {
    "q": "In your Jenkinsfile, you want to clearly separate the \"Build\", \"Test\", and \"Deploy\" steps of your pipeline. What should you define for each of these steps?",
    "options": [
      "A branch",
      "A stage",
      "A commit",
      "An inventory"
    ]
  },
  {
    "q": "Your organization notices that developers and operations teams work in silos, causing delays and miscommunication during releases. Which approach should they adopt to fix this?",
    "options": [
      "Waterfall model",
      "DevOps culture",
      "Manual deployment only",
      "No automation"
    ]
  },
  {
    "q": "Your team wants to automatically build and test code every time a developer pushes changes, to catch bugs early. What DevOps practice does this describe?",
    "options": [
      "Waterfall",
      "Continuous Integration (CI)",
      "Manual QA only",
      "SSH tunneling"
    ]
  },
  {
    "q": "After code passes all tests, your team wants it automatically prepared and released to production with minimal manual steps. What DevOps practice enables this?",
    "options": [
      "Continuous Delivery/Deployment (CD)",
      "Waterfall model",
      "Manual review only",
      "Ansible inventory"
    ]
  },
  {
    "q": "Your company wants faster, more reliable software releases through better collaboration between developers and operations. What is this overall goal typically called?",
    "options": [
      "Waterfall management",
      "DevOps",
      "Manual scripting",
      "Static testing"
    ]
  },
  {
    "q": "Your project manager insists that testing can only begin after development is 100% complete, following strict sequential phases. What software development model is being followed?",
    "options": [
      "DevOps",
      "Waterfall model",
      "Continuous Deployment",
      "Agile Scrum"
    ]
  },
  {
    "q": "Midway through a Waterfall project, the client requests major changes to requirements. Why is this typically difficult to accommodate?",
    "options": [
      "Because Waterfall allows changes anytime",
      "Because each phase must be completed before moving to the next, making late changes costly",
      "Because Waterfall has no phases",
      "Because Waterfall skips requirements"
    ]
  },
  {
    "q": "Your team is starting a new Waterfall project. What is typically the very first phase they must complete?",
    "options": [
      "Deployment",
      "Requirements gathering and analysis",
      "Maintenance",
      "Testing"
    ]
  },
  {
    "q": "You need to securely log into a remote Linux server to deploy your application. Which protocol/tool would you use?",
    "options": [
      "FTP",
      "SSH",
      "HTTP",
      "Maven"
    ]
  },
  {
    "q": "Your DevOps engineer sets up passwordless login to a server by placing a public key on it. Which file on the remote server typically stores this key?",
    "options": [
      "known_hosts",
      "authorized_keys",
      "inventory",
      "Jenkinsfile"
    ]
  },
  {
    "q": "Your team wants to automate the configuration of 50 servers (installing packages, updating configs) without manually logging into each one. Which tool is best suited for this?",
    "options": [
      "Maven",
      "Ansible",
      "Git",
      "SSH alone"
    ]
  },
  {
    "q": "Before running an Ansible playbook, you need to define which remote servers it should manage. Where do you list these servers?",
    "options": [
      "Jenkinsfile",
      "Inventory file",
      "pom.xml",
      "known_hosts"
    ]
  },
  {
    "q": "You want to write a set of automation tasks (like installing nginx and starting a service) that Ansible can run across multiple servers. What do you create for this?",
    "options": [
      "A Jenkinsfile",
      "A Playbook (YAML file)",
      "A pom.xml",
      "A Dockerfile"
    ]
  }
];

export const MARKS_PER_QUESTION = 1;
export const TOTAL_MARKS = QUESTIONS.length * MARKS_PER_QUESTION;
export const OPTION_LABELS = ["A", "B", "C", "D"];

/* obfuscated answer payload — not human-readable in sources */
export const ANSWER_PAYLOAD = "W2Fpb3R8hYqTmKGmrLS+wsvR2d7n7PX6AwsRFhwlLTI4QElOV1xlanN4gYaPlJ2iq7C5vsfM1trj6fH2/wQNExggKS43PEVKU1hhZW90fYKLkJqep6y1usPI0Nbf5O3y+wAJDg==";
