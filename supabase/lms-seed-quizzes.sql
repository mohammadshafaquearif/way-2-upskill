-- AUTO-GENERATED — do not edit by hand
-- Source: src/lib/lms/quiz-catalog.json
-- Regenerate: npm run sync:quiz-seed
-- Run in Supabase SQL Editor after lms-schema.sql

CREATE OR REPLACE FUNCTION public.seed_topic_quizzes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  entry RECORD;
  v_question RECORD;
  v_course_id UUID;
  v_module_id UUID;
  v_topic_id UUID;
  v_quiz_id UUID;
  v_sort INT;
  v_expected INT;
  v_existing INT;
BEGIN
  FOR entry IN
    SELECT *
    FROM jsonb_to_recordset($catalog$
[
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 1,
    "topic_title": "Linux Administration, Files, Permissions & Processes",
    "quiz_title": "Linux Administration, Files, Permissions & Processes — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "You are logged into a Linux server and want to verify your current location in the filesystem before creating new files and directories. Which command should you use to display the absolute path of your current working directory?",
        "options": [
          {
            "id": "a",
            "text": "ls",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "pwd",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cd",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "whereis",
            "is_correct": false
          }
        ]
      },
      {
        "question": "As a Linux administrator, you need to view all files and directories available in your current location before performing any operations. Which command will help you list the contents of the current directory?",
        "options": [
          {
            "id": "a",
            "text": "pwd",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ls",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cat",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "touch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are currently working in the '/home/user' directory and need to move to the '/etc' directory to edit a configuration file. Which Linux command is used to change directories?",
        "options": [
          {
            "id": "a",
            "text": "mv",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "cd",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "cp",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "pwd",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A project requires you to organize files into separate folders. Which command would you use to create a new directory named 'project_data' in Linux?",
        "options": [
          {
            "id": "a",
            "text": "touch project_data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "mkdir project_data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "create project_data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "dir project_data",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to create an empty text file called 'notes.txt' that will later be used to store configuration details. Which command is most commonly used for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "mkdir notes.txt",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "cat notes.txt",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "touch notes.txt",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "nano notes.txt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A file has the permission string '-rw-r--r--'. What level of access does the owner of the file have?",
        "options": [
          {
            "id": "a",
            "text": "Read only",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Read and Write",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Read, Write, and Execute",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Execute only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have created a shell script named 'backup.sh' and want to make it executable. Which command should you use to grant execute permission to the owner, group, and others?",
        "options": [
          {
            "id": "a",
            "text": "chmod 644 backup.sh",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "chmod 755 backup.sh",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "chmod 600 backup.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "chmod 444 backup.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer reports that they cannot modify a file because they are not the owner. As a Linux administrator, which command would you use to change the ownership of the file?",
        "options": [
          {
            "id": "a",
            "text": "chmod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "chown",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "passwd",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "usermod",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to inspect the contents of a configuration file named 'config.txt' directly from the terminal without opening a text editor. Which command is best suited for this task?",
        "options": [
          {
            "id": "a",
            "text": "cat config.txt",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "chmod config.txt",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ps config.txt",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "mkdir config.txt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "While troubleshooting a production server, you need to identify which user account is currently logged into the terminal session. Which command will display the username of the active user?",
        "options": [
          {
            "id": "a",
            "text": "who",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "users",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "id",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "whoami",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A Linux server appears to be running slowly. You want to view all active processes and monitor CPU and memory utilization in real time. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "df -h",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "free -m",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "top",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "pwd",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need a snapshot of currently running processes without entering an interactive monitoring mode. Which command is specifically designed to display process information?",
        "options": [
          {
            "id": "a",
            "text": "ps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "ls",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "chmod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "mount",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A process with PID 5678 is consuming excessive resources and must be terminated gracefully, allowing it to shut down properly. Which command should you use first?",
        "options": [
          {
            "id": "a",
            "text": "kill -9 5678",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kill 5678",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "terminate 5678",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "stop 5678",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A process is unresponsive and does not stop even after receiving a normal termination signal. Which command will forcefully terminate the process with PID 5678?",
        "options": [
          {
            "id": "a",
            "text": "kill 5678",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kill -15 5678",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kill -9 5678",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "stop 5678",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are reviewing permissions on a critical shell script and notice the permission value is set to 777. What does this permission setting mean?",
        "options": [
          {
            "id": "a",
            "text": "Only the owner can read, write, and execute",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Owner and group have full access, others have read-only access",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Everyone has read, write, and execute permissions",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Everyone has read-only access",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 2,
    "topic_title": "Shell Scripting & Automation",
    "quiz_title": "Shell Scripting & Automation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "You frequently run the same set of Linux commands every morning to check system health. What is the primary benefit of creating a shell script for these tasks?",
        "options": [
          {
            "id": "a",
            "text": "Increase internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automate repetitive tasks",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Install software automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Improve hardware performance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A shell script file named 'backup.sh' has been created. Before running it, which command should be used to make the script executable?",
        "options": [
          {
            "id": "a",
            "text": "chmod +x backup.sh",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "touch backup.sh",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "mkdir backup.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "cat backup.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which line is commonly used at the beginning of a Bash shell script to specify the interpreter that should execute the script?",
        "options": [
          {
            "id": "a",
            "text": "#!/bin/bash",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "#include bash",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "bash start",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "#script bash",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a shell script to display the message 'Welcome to Linux Automation'. Which command should be used inside the script?",
        "options": [
          {
            "id": "a",
            "text": "print",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "display",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "echo",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "show",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A script asks the user to enter their name and stores it in a variable called 'username'. Which command is used to take input from the user?",
        "options": [
          {
            "id": "a",
            "text": "input",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "scan",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "read",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "get",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a shell script, a variable named 'city' contains the value 'Bengaluru'. How would you display its value using the echo command?",
        "options": [
          {
            "id": "a",
            "text": "echo city",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "echo %city%",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "echo $city",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "echo @city",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a script to perform different actions based on whether a user enters 'yes' or 'no'. Which shell scripting construct is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "for loop",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "while loop",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "if statement",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "function",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A script needs to display numbers from 1 to 5 automatically. Which shell scripting concept is typically used for this task?",
        "options": [
          {
            "id": "a",
            "text": "Variable",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Function",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Loop",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Comment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have written a script named 'healthcheck.sh' and want to execute it from the current directory. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "healthcheck.sh",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "./healthcheck.sh",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "run healthcheck.sh",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "execute healthcheck.sh",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses a shell script to automatically generate daily server reports and save them to a file. This is an example of which use case of shell scripting?",
        "options": [
          {
            "id": "a",
            "text": "Gaming",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Web Designing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Task Automation",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Database Creation",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 3,
    "topic_title": "Git & GitHub Workflows, Branching & Pull Requests",
    "quiz_title": "Git & GitHub Workflows, Branching & Pull Requests — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You have cloned a project from GitHub and want to verify which branch you are currently working on. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git branch",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git remote -v",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have created a new feature called 'login-page' and want to develop it without affecting the main codebase. Which command creates and switches to a new branch?",
        "options": [
          {
            "id": "a",
            "text": "git checkout login-page",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git branch login-page",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git checkout -b login-page",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git merge login-page",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After making changes to several files, you want to see which files have been modified before committing them. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git diff",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git pull",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have completed your code changes and want to add all modified files to the staging area. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git commit -m",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git add .",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git push",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have staged your changes and now want to save them in Git with a meaningful message. Which command is used to create a commit?",
        "options": [
          {
            "id": "a",
            "text": "git save -m",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git commit -m 'message'",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git push origin main",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git add commit",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to upload your local commits to the remote GitHub repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git upload",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git push",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git commit",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git publish",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A teammate has pushed new changes to GitHub. Which command will download and merge those changes into your local branch?",
        "options": [
          {
            "id": "a",
            "text": "git clone",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git fetch",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git pull",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to create a copy of an existing GitHub repository on your local machine for the first time. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git pull",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git fork",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git clone",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git checkout",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before starting a new feature, you want to see all branches available in your local repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git branches",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git branch",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "git log",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have finished working on a feature branch and want to switch back to the main branch. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git branch main",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git checkout main",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git merge main",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git push main",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After testing a feature branch, you want to combine its changes into the main branch. Which Git operation should you perform?",
        "options": [
          {
            "id": "a",
            "text": "Clone",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pull",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Merge",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Fork",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team follows a workflow where every feature is developed in a separate branch before being added to the main codebase. What is the primary advantage of using branches?",
        "options": [
          {
            "id": "a",
            "text": "Increases internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Allows isolated development without affecting main code",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Automatically fixes bugs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deletes old commits",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to review the history of commits made in a repository. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git log",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git diff",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git branch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer has completed a feature and wants team members to review the code before it is merged into the main branch. Which GitHub feature should they create?",
        "options": [
          {
            "id": "a",
            "text": "Issue",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Repository",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Pull Request",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Release",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Pull Request in GitHub?",
        "options": [
          {
            "id": "a",
            "text": "Delete code from repository",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Request code review and merge changes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Download repository files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create a new repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A teammate comments on your Pull Request and requests changes. What should you do next?",
        "options": [
          {
            "id": "a",
            "text": "Delete the Pull Request",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Ignore the comments",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Make the requested changes and push new commits",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Create a new repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You accidentally made changes directly on the main branch. What is generally considered a better professional practice?",
        "options": [
          {
            "id": "a",
            "text": "Continue working on main",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create feature branches for new work",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete main branch",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Push code without testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team lead asks you to check which remote repository your local project is connected to. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "git status",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "git remote -v",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "git log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git branch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A project follows the workflow: Create Branch → Develop Feature → Commit Changes → Push Branch → Create Pull Request. What is the main benefit of this workflow?",
        "options": [
          {
            "id": "a",
            "text": "Reduces collaboration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Allows code review and safer development",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Prevents commits",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are working on a team project and want to ensure your local branch contains the latest code from GitHub before starting new work. Which command should you run first?",
        "options": [
          {
            "id": "a",
            "text": "git pull",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "git commit",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "git push",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "git merge",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 4,
    "topic_title": "Cloud Fundamentals — AWS IAM, EC2, S3, VPC",
    "quiz_title": "Cloud Fundamentals — AWS IAM, EC2, S3, VPC — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your company wants to move its applications from on-premises servers to AWS. What is the primary benefit of cloud computing compared to traditional infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "Unlimited free hardware",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "On-demand scalability and pay-as-you-go pricing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "No internet connection required",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Permanent fixed resources",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are an AWS administrator and need to create individual accounts for team members while controlling what resources they can access. Which AWS service should you use?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS IAM",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon VPC",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A new developer joins your team and requires access to AWS services. What is the best practice?",
        "options": [
          {
            "id": "a",
            "text": "Share the root account credentials",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create an IAM User with appropriate permissions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable authentication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create another AWS account",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to grant read-only access to an S3 bucket for multiple users. Which IAM feature should be used to assign permissions efficiently?",
        "options": [
          {
            "id": "a",
            "text": "IAM Groups",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "IAM Passwords",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Login URLs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS Regions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application requires a virtual server where you can install software, run applications, and manage the operating system. Which AWS service should you choose?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon Route 53",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company website needs to run continuously on a Linux server hosted in AWS. Which EC2 feature allows you to launch and manage virtual machines?",
        "options": [
          {
            "id": "a",
            "text": "EC2 Instances",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "S3 Buckets",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "IAM Policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "VPC Peering",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have uploaded application logs, images, and backups to AWS and need durable object storage. Which AWS service is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Amazon VPC",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company stores thousands of image files in AWS. What is the storage container called in Amazon S3?",
        "options": [
          {
            "id": "a",
            "text": "Folder",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Bucket",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Instance",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs to make certain files publicly accessible through a URL while keeping other files private. Which AWS service supports this capability?",
        "options": [
          {
            "id": "a",
            "text": "Amazon S3",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "AWS CloudTrail",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to isolate your AWS resources within a private network and control inbound and outbound traffic. Which AWS service should you use?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Amazon VPC",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Amazon S3",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A VPC allows you to create a logically isolated network in AWS. Which component within a VPC helps divide the network into smaller sections?",
        "options": [
          {
            "id": "a",
            "text": "Buckets",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Subnets",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Policies",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Volumes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You launch an EC2 instance inside a public subnet and want users on the internet to access it. Which component allows communication between the VPC and the internet?",
        "options": [
          {
            "id": "a",
            "text": "IAM Role",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Internet Gateway",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "S3 Bucket",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudWatch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your company wants developers to upload files to S3 but prevent them from deleting objects. Which AWS service should be used to define these permissions?",
        "options": [
          {
            "id": "a",
            "text": "Amazon EC2",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "AWS IAM",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Amazon VPC",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudFront",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are designing a simple web application on AWS. Which combination of services is commonly used to host the application and store uploaded files?",
        "options": [
          {
            "id": "a",
            "text": "IAM + VPC",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "EC2 + S3",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "VPC + IAM",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CloudTrail + IAM",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A startup wants to deploy a secure web application on AWS. They need user access management, virtual servers, object storage, and network isolation. Which combination of AWS services fulfills these requirements?",
        "options": [
          {
            "id": "a",
            "text": "IAM, EC2, S3, and VPC",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "EC2, Lambda, SNS, and CloudWatch",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "S3, Route53, CloudTrail, and EBS",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "IAM, DynamoDB, CloudFront, and Athena",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 1,
    "topic_sort": 5,
    "topic_title": "AI Tools — GitHub Copilot, Prompt Engineering for Infra",
    "quiz_title": "AI Tools — GitHub Copilot, Prompt Engineering for Infra — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You need to create a Dockerfile for a Node.js application but are unsure about the syntax. Which AI tool can help generate the code directly inside your IDE?",
        "options": [
          {
            "id": "a",
            "text": "GitHub Copilot",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Amazon S3",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of GitHub Copilot for DevOps and Cloud Engineers?",
        "options": [
          {
            "id": "a",
            "text": "Host applications",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Generate and suggest code automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Store files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitor servers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You are writing a Bash script to monitor disk usage. GitHub Copilot can help by:",
        "options": [
          {
            "id": "a",
            "text": "Deploying the script automatically",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Suggesting script code and commands",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating EC2 instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants ChatGPT to generate a Terraform script for creating an EC2 instance. What should the engineer provide first?",
        "options": [
          {
            "id": "a",
            "text": "A clear prompt describing the requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The AWS bill",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The EC2 instance ID",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker image",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Prompt Engineering?",
        "options": [
          {
            "id": "a",
            "text": "Writing Python applications",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Designing cloud networks",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating effective instructions for AI systems",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Building CI/CD pipelines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which prompt is likely to produce the best result from an AI assistant?",
        "options": [
          {
            "id": "a",
            "text": "Create infrastructure",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Help me",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Create a Terraform script to deploy an EC2 instance in us-east-1 with security group access on port 22",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "AWS",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want AI to explain a Kubernetes Deployment YAML file line by line. Which approach is best?",
        "options": [
          {
            "id": "a",
            "text": "Ask a specific question and provide the YAML",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Type 'Kubernetes'",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Upload nothing and expect an answer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ask unrelated questions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A well-written prompt generally contains:",
        "options": [
          {
            "id": "a",
            "text": "Clear requirements and context",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only one word",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Random commands",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No objective",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want ChatGPT to act as a senior DevOps engineer and review your CI/CD pipeline. Which prompting technique are you using?",
        "options": [
          {
            "id": "a",
            "text": "Role-based prompting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database prompting",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Network prompting",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storage prompting",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a good use case for GitHub Copilot?",
        "options": [
          {
            "id": "a",
            "text": "Generating Dockerfiles",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating shell scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Writing Terraform code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You ask an AI tool to generate a Bash script, but the output is incomplete. What should you do next?",
        "options": [
          {
            "id": "a",
            "text": "Provide more context and requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the script immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ignore the output",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Restart your computer",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before using AI-generated infrastructure code in production, what should a DevOps engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the code",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Share it publicly",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A prompt asks ChatGPT to create an AWS architecture diagram description. Which skill is being used?",
        "options": [
          {
            "id": "a",
            "text": "Prompt Engineering",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Docker Networking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Git Branching",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Linux Administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "GitHub Copilot suggestions are generated based on:",
        "options": [
          {
            "id": "a",
            "text": "The current code and comments in your editor",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Your internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "AWS account settings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Computer RAM only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with in DevOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Writing Infrastructure as Code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Generating scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Troubleshooting errors",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You receive an error from Terraform and want AI assistance. Which prompt is most effective?",
        "options": [
          {
            "id": "a",
            "text": "Fix this",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform error",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Explain this Terraform error and suggest a fix: [paste error message]",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "AWS issue",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is it important to verify AI-generated commands before executing them on production servers?",
        "options": [
          {
            "id": "a",
            "text": "AI outputs may contain mistakes or assumptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AI commands always fail",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Servers do not support AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Linux blocks AI commands",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants AI to generate a GitHub Actions workflow. Which information should be included in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Application type and deployment requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Favorite movie",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Laptop model",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Office address",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the main advantage of using AI tools like GitHub Copilot in DevOps tasks?",
        "options": [
          {
            "id": "a",
            "text": "Reduce repetitive work and improve productivity",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove the need for engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your manager asks you to generate a Docker Compose file quickly using AI. After receiving the output, what is the most professional next step?",
        "options": [
          {
            "id": "a",
            "text": "Review, test, and validate the configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy directly to production",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Delete the file",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the generated content",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 1,
    "topic_title": "Docker & Containerization",
    "quiz_title": "Docker & Containerization — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 40,
    "questions": [
      {
        "question": "You have installed Docker on a Linux server and want to verify that Docker is running correctly. Which command would you use?",
        "options": [
          {
            "id": "a",
            "text": "docker version",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker status",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker check",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to see all Docker images currently available on your system before creating a container. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker ps",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker images",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker list",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to download the latest Nginx image from Docker Hub. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "docker get nginx",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker pull nginx",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker install nginx",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker fetch nginx",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have downloaded the Nginx image and now want to start a container from it. Which command is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "docker run nginx",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker create nginx",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start nginx",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker launch nginx",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Docker image can best be described as:",
        "options": [
          {
            "id": "a",
            "text": "A running application",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A blueprint used to create containers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A storage volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A network configuration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Docker container can best be described as:",
        "options": [
          {
            "id": "a",
            "text": "A running instance of an image",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A Docker registry",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A Dockerfile",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view all currently running containers on your system. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker ps",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker inspect",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker logs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to see all containers, including stopped containers. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker ps",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker ps -a",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker all",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A container named 'webapp' is no longer needed. Which command will stop the running container?",
        "options": [
          {
            "id": "a",
            "text": "docker remove webapp",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker stop webapp",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker killall webapp",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker terminate webapp",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After stopping a container, you want to start it again without creating a new one. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker run webapp",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker create webapp",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start webapp",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "docker launch webapp",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view the logs generated by a running container named 'nginx-container'. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker inspect nginx-container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker logs nginx-container",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker output nginx-container",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker status nginx-container",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is running inside a container on port 80, and you want users to access it on port 8080 of the host machine. Which Docker option is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "-p 8080:80",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "-v 8080:80",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "-e 8080:80",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "--port 80",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have modified an application running inside a container and want to save it as a new Docker image. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "docker build",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker commit",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker save",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker export",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to define multiple containers such as a web server and database in a single configuration file. Which Docker tool is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker Registry",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Docker Compose",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Docker Volume",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which file is commonly used to define services, networks, and volumes in Docker Compose?",
        "options": [
          {
            "id": "a",
            "text": "Dockerfile",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker-compose.yml",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "compose.conf",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker.yaml",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have a docker-compose.yml file and want to start all defined services. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "docker compose up",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "docker compose run",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "docker start compose",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker run compose",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to store and share Docker images in a central location so that other developers can download them. What is this storage location called?",
        "options": [
          {
            "id": "a",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Registry",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Docker Hub is an example of:",
        "options": [
          {
            "id": "a",
            "text": "A container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A registry",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Docker network",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have built a custom image called 'myapp:v1' and want to upload it to Docker Hub. Which command is typically used?",
        "options": [
          {
            "id": "a",
            "text": "docker upload myapp:v1",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "docker push myapp:v1",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "docker publish myapp:v1",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "docker deploy myapp:v1",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team wants to package an application along with all its dependencies so that it runs consistently on any machine. Which Docker concept provides this capability?",
        "options": [
          {
            "id": "a",
            "text": "Images and Containers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Volumes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Networks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Registries Only",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 2,
    "topic_title": "Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm",
    "quiz_title": "Kubernetes — Architecture, Pods, Services, Deployments, ConfigMaps, Secrets, Helm — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your company wants to run containerized applications at scale with automated deployment, scaling, and self-healing capabilities. Which platform is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker Compose",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Kubernetes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "GitHub Actions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Kubernetes architecture, which component is responsible for managing the overall cluster and making scheduling decisions?",
        "options": [
          {
            "id": "a",
            "text": "Worker Node",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Control Plane",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Container Runtime",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Kubernetes cluster consists of one Control Plane and multiple Worker Nodes. What is the primary responsibility of Worker Nodes?",
        "options": [
          {
            "id": "a",
            "text": "Managing cluster configuration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Running application workloads",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating Kubernetes manifests",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Storing Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have deployed a containerized application in Kubernetes. What is the smallest deployable unit in Kubernetes that can contain one or more containers?",
        "options": [
          {
            "id": "a",
            "text": "Node",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Pod",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application Pod crashes unexpectedly. Kubernetes automatically creates a replacement Pod to maintain availability. Which Kubernetes feature enables this behavior?",
        "options": [
          {
            "id": "a",
            "text": "Service",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Helm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You need to view all Pods currently running in a Kubernetes cluster. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "kubectl get deployments",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kubectl get services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kubectl get pods",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "kubectl get nodes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is running successfully inside a Pod, but users cannot access it from outside the cluster. Which Kubernetes resource is used to expose applications and provide network access?",
        "options": [
          {
            "id": "a",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Service",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Namespace",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team wants a stable endpoint that forwards traffic to a group of Pods even if individual Pods are recreated. Which Kubernetes resource provides this functionality?",
        "options": [
          {
            "id": "a",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Node",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Secret",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to store application configuration values such as environment names, URLs, and feature flags separately from the application code. Which Kubernetes resource should be used?",
        "options": [
          {
            "id": "a",
            "text": "Secret",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ConfigMap",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Helm Chart",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A database application requires storing sensitive information such as passwords, API keys, and tokens. Which Kubernetes resource is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "ConfigMap",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secret",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs to update an application from version 1.0 to version 2.0 with minimal downtime. Which Kubernetes resource manages rolling updates and application versions?",
        "options": [
          {
            "id": "a",
            "text": "Pod",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Service",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deployment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "ConfigMap",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to check all Deployments running in a Kubernetes cluster. Which command should you use?",
        "options": [
          {
            "id": "a",
            "text": "kubectl get pods",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "kubectl get nodes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "kubectl get deployments",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "kubectl get services",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to package Kubernetes manifests, configuration files, and deployment templates into a reusable unit that can be installed across environments. Which tool is commonly used?",
        "options": [
          {
            "id": "a",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Helm",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Helm is often referred to as the package manager for Kubernetes. What is the name of a deployable package in Helm?",
        "options": [
          {
            "id": "a",
            "text": "Bundle",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Artifact",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Chart",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Package File",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production application running on Kubernetes requires Pods, Deployments, Services, configuration values, and secrets to work together. Which statement best describes the role of Kubernetes in this scenario?",
        "options": [
          {
            "id": "a",
            "text": "It only runs containers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It only manages networking",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It orchestrates and manages containerized applications and their resources",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "It replaces Docker completely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 3,
    "topic_title": "CI/CD — GitHub Actions, Jenkins",
    "quiz_title": "CI/CD — GitHub Actions, Jenkins — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A development team wants code changes to be automatically tested and deployed whenever code is pushed to GitHub. Which software engineering practice enables this automation?",
        "options": [
          {
            "id": "a",
            "text": "Virtualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does 'CI' stand for in CI/CD?",
        "options": [
          {
            "id": "a",
            "text": "Code Integration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Continuous Integration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Continuous Infrastructure",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud Integration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does 'CD' commonly stand for in modern DevOps practices?",
        "options": [
          {
            "id": "a",
            "text": "Continuous Delivery/Deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Code Delivery",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cloud Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Delivery",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer pushes code to GitHub, and an automated process immediately runs tests. Which phase of CI/CD is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Continuous Integration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Monitoring",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Logging",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants to automate application builds, testing, and deployments directly from GitHub repositories. Which tool is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Jenkins",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "GitHub Actions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "GitHub Actions workflows are typically defined using which file format?",
        "options": [
          {
            "id": "a",
            "text": "JSON",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "XML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "YAML",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "CSV",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want a GitHub Actions workflow to run automatically whenever code is pushed to the main branch. What is this called in GitHub Actions?",
        "options": [
          {
            "id": "a",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Runner",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Trigger/Event",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Pipeline Stage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses Jenkins to automate software delivery. What is Jenkins primarily used for?",
        "options": [
          {
            "id": "a",
            "text": "Container Storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD Automation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Cloud Hosting",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Jenkins Pipeline is best described as:",
        "options": [
          {
            "id": "a",
            "text": "A Docker Image",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A sequence of automated build, test, and deployment steps",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A Kubernetes Pod",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A Git Repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application code has successfully passed automated tests. The next stage automatically deploys the application to a test environment. Which benefit of CI/CD does this demonstrate?",
        "options": [
          {
            "id": "a",
            "text": "Manual deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automated software delivery",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Database replication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version rollback",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to ensure code quality before deployment. Which activity is commonly included in a CI/CD pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Automated Testing",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Server Installation",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hardware Upgrade",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network Replacement",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Jenkins, which component executes the jobs or pipelines assigned by the Jenkins Controller?",
        "options": [
          {
            "id": "a",
            "text": "Worker/Agent",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Repository",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Plugin",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Registry",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your GitHub Actions workflow builds a Docker image every time code is pushed. What is the main advantage of this automation?",
        "options": [
          {
            "id": "a",
            "text": "Reduces manual effort and human errors",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increases hardware costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disables testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prevents collaboration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to view whether a pipeline succeeded or failed after a deployment. Which feature is commonly provided by both Jenkins and GitHub Actions?",
        "options": [
          {
            "id": "a",
            "text": "Pipeline Execution Logs",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Database Backups",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Container Registries",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud Networking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A modern software team uses GitHub Actions for CI and Jenkins for enterprise deployments. What is the primary goal of both tools?",
        "options": [
          {
            "id": "a",
            "text": "Store application data",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automate software build, test, and deployment processes",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace source control systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage cloud networking",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 4,
    "topic_title": "Blue-Green & Canary Deployments",
    "quiz_title": "Blue-Green & Canary Deployments — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A company wants to deploy a new version of its application without affecting users currently using the old version. Which deployment strategy is specifically designed for this purpose by maintaining two identical environments?",
        "options": [
          {
            "id": "a",
            "text": "Rolling Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Blue-Green Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Recreate Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Blue-Green deployment strategy, what does the 'Blue' environment typically represent?",
        "options": [
          {
            "id": "a",
            "text": "The testing environment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The currently live production environment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The backup server",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The monitoring system",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team has deployed version 2 of an application to the Green environment and completed testing. What is the next step in a Blue-Green deployment?",
        "options": [
          {
            "id": "a",
            "text": "Delete the Blue environment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Switch user traffic from Blue to Green",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create a new container",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Stop monitoring the application",
            "is_correct": false
          }
        ]
      },
      {
        "question": "One of the biggest advantages of Blue-Green deployments is:",
        "options": [
          {
            "id": "a",
            "text": "Reduced storage requirements",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Fast rollback capability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "No testing required",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No infrastructure needed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After switching traffic to the Green environment, users begin reporting critical issues. What is the fastest recovery action in a Blue-Green deployment?",
        "options": [
          {
            "id": "a",
            "text": "Rebuild the application",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Create new servers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Switch traffic back to Blue",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Restart the database",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to release a new application version to only 10% of users first and gradually increase traffic if no issues occur. Which deployment strategy should be used?",
        "options": [
          {
            "id": "a",
            "text": "Blue-Green Deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Canary Deployment",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Recreate Deployment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manual Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of a Canary deployment?",
        "options": [
          {
            "id": "a",
            "text": "Deploy to all users at once",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce deployment risks by exposing a small group of users to the new version first",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increase server storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Canary deployment, the new application version is initially exposed to:",
        "options": [
          {
            "id": "a",
            "text": "100% of users",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Only administrators",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A small percentage of users",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "No users",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your monitoring dashboard shows increased error rates after a Canary release to 20% of users. What should the deployment team do?",
        "options": [
          {
            "id": "a",
            "text": "Increase traffic to 100%",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Ignore the errors",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Rollback the Canary deployment",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Delete the monitoring system",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best compares Blue-Green and Canary deployments?",
        "options": [
          {
            "id": "a",
            "text": "Blue-Green switches all traffic at once, while Canary gradually shifts traffic to the new version",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Canary switches all traffic at once, while Blue-Green gradually shifts traffic",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both strategies require application downtime",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Neither strategy supports rollbacks",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 2,
    "topic_sort": 5,
    "topic_title": "AI-Assisted Pipeline Generation",
    "quiz_title": "AI-Assisted Pipeline Generation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants to use ChatGPT to generate a GitHub Actions workflow for a Node.js application. What is the most important information to include in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Application requirements and deployment steps",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Laptop specifications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Office location",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Internet speed",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs a CI/CD pipeline that builds a Docker image, runs tests, and deploys to Kubernetes. What is the primary benefit of using AI to generate the initial pipeline configuration?",
        "options": [
          {
            "id": "a",
            "text": "Reduces manual effort and speeds up development",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need for testing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replaces Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for DevOps engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer asks GitHub Copilot to generate a Jenkins Pipeline. Before using it in production, what should be done?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the generated pipeline",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the generated code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable Jenkins",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want ChatGPT to generate a CI/CD workflow that deploys code whenever changes are pushed to the main branch. Which prompt is likely to produce the best results?",
        "options": [
          {
            "id": "a",
            "text": "Create a pipeline",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CI/CD",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Generate a GitHub Actions workflow that builds, tests, and deploys a Node.js application whenever code is pushed to the main branch",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Deploy code",
            "is_correct": false
          }
        ]
      },
      {
        "question": "AI generates a pipeline YAML file, but the deployment stage contains incorrect environment variables. What is the most appropriate action?",
        "options": [
          {
            "id": "a",
            "text": "Review and modify the configuration before deployment",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy anyway",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Delete the entire pipeline",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the issue",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with when building CI/CD pipelines?",
        "options": [
          {
            "id": "a",
            "text": "Generating YAML workflow files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Suggesting deployment steps",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Explaining pipeline errors",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A DevOps engineer receives a pipeline failure error in GitHub Actions. How can AI help in this situation?",
        "options": [
          {
            "id": "a",
            "text": "Analyze logs and suggest possible fixes",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatically purchase cloud resources",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace GitHub Actions",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete failed workflows",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major risk of relying entirely on AI-generated CI/CD pipelines without human review?",
        "options": [
          {
            "id": "a",
            "text": "Pipelines may contain incorrect configurations or security issues",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pipelines become faster",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Applications become more secure automatically",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud costs decrease",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team wants AI to generate a deployment workflow for Kubernetes. Which information should be included in the prompt?",
        "options": [
          {
            "id": "a",
            "text": "Cluster details, deployment requirements, and application information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Favorite programming language only",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Developer names only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating system wallpaper",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of AI-assisted pipeline generation in modern DevOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Replace all DevOps engineers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce repetitive work and accelerate pipeline development",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Eliminate the need for testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove version control systems",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 1,
    "topic_title": "Terraform — Modules, State, Workspaces, IaC",
    "quiz_title": "Terraform — Modules, State, Workspaces, IaC — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "Your company wants to provision AWS infrastructure using code instead of manually creating resources through the AWS Console. Which concept does Terraform primarily support?",
        "options": [
          {
            "id": "a",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Infrastructure as Code (IaC)",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Continuous Integration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Virtualization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer writes Terraform code to create EC2 instances, VPCs, and S3 buckets. What is the main benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Infrastructure can be provisioned consistently and repeatedly",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No cloud account is required",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Resources are created manually",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Applications run faster automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before applying infrastructure changes, a Terraform engineer wants to preview what resources will be created, modified, or deleted. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "terraform apply",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform destroy",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform plan",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "terraform init",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You have downloaded a Terraform project from GitHub and need to initialize providers and modules before using it. Which command should you run first?",
        "options": [
          {
            "id": "a",
            "text": "terraform apply",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform plan",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform init",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "terraform validate",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to reuse the same VPC configuration across multiple projects without duplicating code. Which Terraform feature is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "State Files",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Workspaces",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Modules",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Variables",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Terraform Module is best described as:",
        "options": [
          {
            "id": "a",
            "text": "A reusable collection of Terraform resources and configurations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A storage bucket",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A deployment environment",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud provider account",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Terraform needs to track the infrastructure it has created so that future updates can be managed correctly. Which file is responsible for storing this information?",
        "options": [
          {
            "id": "a",
            "text": "terraform.tfvars",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "terraform.lock.hcl",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "terraform.tfstate",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "main.tf",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is the Terraform State file important?",
        "options": [
          {
            "id": "a",
            "text": "It stores application source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "It tracks infrastructure resources managed by Terraform",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "It contains Docker images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It stores Kubernetes Pods",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your team needs separate environments for development, testing, and production while using the same Terraform codebase. Which Terraform feature is commonly used for this?",
        "options": [
          {
            "id": "a",
            "text": "Providers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Modules",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Workspaces",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "State Locking",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company uses Terraform Workspaces named 'dev', 'test', and 'prod'. What is the primary benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Managing multiple environments using the same Terraform configuration",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Creating multiple AWS accounts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replacing state files",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Eliminating the need for modules",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 2,
    "topic_title": "Ansible — Configuration Management, Provisioning",
    "quiz_title": "Ansible — Configuration Management, Provisioning — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A company manages 50 Linux servers and wants to install software on all of them using a single command instead of logging into each server individually. Which tool is specifically designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Kubernetes",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ansible",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Ansible in a DevOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration management and automation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source code management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to automate server setup tasks such as installing packages, creating users, and configuring services. Which Ansible feature is commonly used for this?",
        "options": [
          {
            "id": "a",
            "text": "Playbooks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pods",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible Playbooks are typically written in which format?",
        "options": [
          {
            "id": "a",
            "text": "JSON",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "XML",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "YAML",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "CSV",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to view all servers managed by Ansible before running a playbook. Which file usually contains the list of managed hosts?",
        "options": [
          {
            "id": "a",
            "text": "docker-compose.yml",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "inventory file",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "terraform.tfstate",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Jenkinsfile",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Ansible architecture, what is the role of the Control Node?",
        "options": [
          {
            "id": "a",
            "text": "Runs playbooks and manages target servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Stores Docker images",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Hosts applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Creates Kubernetes clusters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible communicates with Linux servers primarily using which protocol?",
        "options": [
          {
            "id": "a",
            "text": "FTP",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SSH",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "SMTP",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "SNMP",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants every web server to have Nginx installed and running. Which Ansible capability helps ensure all servers maintain the desired configuration?",
        "options": [
          {
            "id": "a",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Infrastructure Provisioning in the context of Ansible?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating and configuring servers automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Managing source code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Building Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to execute an Ansible playbook called 'webserver.yml'. Which command should be used?",
        "options": [
          {
            "id": "a",
            "text": "ansible-run webserver.yml",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "ansible-playbook webserver.yml",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "ansible start webserver.yml",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "ansible deploy webserver.yml",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to install Apache on 20 servers simultaneously using Ansible. What is the biggest advantage of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Manual configuration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Automation and consistency across servers",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Higher hardware requirements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduced network connectivity",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Ansible is often called an 'agentless' tool. What does this mean?",
        "options": [
          {
            "id": "a",
            "text": "No software agent needs to be installed on managed servers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No inventory file is required",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "No SSH connection is needed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No automation is possible",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team needs to configure development, testing, and production servers differently while using the same playbook. Which Ansible feature can help organize servers into groups?",
        "options": [
          {
            "id": "a",
            "text": "Inventory Groups",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pods",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Secrets",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A newly provisioned server should automatically receive users, packages, firewall rules, and application configurations. Which DevOps practice is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Manual Administration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Configuration Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your company wants repeatable and reliable server configurations across hundreds of machines. Which statement best describes how Ansible helps achieve this goal?",
        "options": [
          {
            "id": "a",
            "text": "By manually configuring each server",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "By automating infrastructure provisioning and configuration management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "By replacing cloud providers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "By eliminating the need for Linux",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 3,
    "topic_title": "DevSecOps — Vulnerability Scanning, Secrets Management",
    "quiz_title": "DevSecOps — Vulnerability Scanning, Secrets Management — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A development team wants to identify security vulnerabilities in their application before deploying it to production. Which DevSecOps practice helps achieve this goal?",
        "options": [
          {
            "id": "a",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Vulnerability Scanning",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of vulnerability scanning in a DevSecOps pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Increase application performance",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Detect known security weaknesses and risks",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploy applications faster",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduce cloud costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer scans a Docker image before deployment and discovers several critical vulnerabilities in outdated packages. What should be done next?",
        "options": [
          {
            "id": "a",
            "text": "Deploy the image immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Update or patch the vulnerable components",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore the findings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete the CI/CD pipeline",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of resource is commonly scanned for vulnerabilities in modern DevSecOps workflows?",
        "options": [
          {
            "id": "a",
            "text": "Docker Images",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Source Code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating Systems",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company wants security checks to run automatically whenever developers push code to GitHub. Where should vulnerability scanning ideally be integrated?",
        "options": [
          {
            "id": "a",
            "text": "Only in production",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Inside the CI/CD Pipeline",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "After a security incident",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Only on developer laptops",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An application requires access to a database password. Which approach is considered the most secure in a DevSecOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Store the password directly in source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Share the password through email",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Store the password in a Secrets Management solution",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Save the password in a public GitHub repository",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary purpose of Secrets Management?",
        "options": [
          {
            "id": "a",
            "text": "Store application logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Manage sensitive information such as passwords, API keys, and tokens",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitor server performance",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a secret that should be protected?",
        "options": [
          {
            "id": "a",
            "text": "Database Password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "API Key",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Access Token",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A security audit finds AWS access keys hardcoded inside application code. Why is this considered a security risk?",
        "options": [
          {
            "id": "a",
            "text": "The application will run faster",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Sensitive credentials can be exposed to unauthorized users",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The code becomes easier to maintain",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It improves security",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the goal of DevSecOps?",
        "options": [
          {
            "id": "a",
            "text": "Add security as a final step before deployment",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Integrate security practices throughout the software development lifecycle",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace DevOps with Security Teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Focus only on compliance documentation",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 4,
    "topic_title": "Vault, AWS Secrets Manager, Security Automation",
    "quiz_title": "Vault, AWS Secrets Manager, Security Automation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A company wants to securely store database passwords, API keys, and application secrets instead of hardcoding them in source code. Which category of tools is designed for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring Tools",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Management Tools",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Container Registries",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CI/CD Tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "HashiCorp Vault is primarily used for:",
        "options": [
          {
            "id": "a",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets management and secure credential storage",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Source code management",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "AWS Secrets Manager is a managed AWS service designed to:",
        "options": [
          {
            "id": "a",
            "text": "Run EC2 instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store and manage secrets securely",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Monitor applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Create VPCs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A developer accidentally commits AWS access keys to a GitHub repository. Which security practice could have helped prevent this issue?",
        "options": [
          {
            "id": "a",
            "text": "Hardcoding credentials",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Management",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Manual Deployments",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Public Repositories",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a secret that should be stored in Vault or AWS Secrets Manager?",
        "options": [
          {
            "id": "a",
            "text": "Database Password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "API Token",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "SSH Private Key",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A DevOps engineer wants applications to retrieve secrets securely at runtime instead of storing them in configuration files. Which approach is considered best practice?",
        "options": [
          {
            "id": "a",
            "text": "Store secrets in source code",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store secrets in README files",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Retrieve secrets from a Secrets Management solution",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Share secrets through email",
            "is_correct": false
          }
        ]
      },
      {
        "question": "One major advantage of AWS Secrets Manager is:",
        "options": [
          {
            "id": "a",
            "text": "Automatic secret rotation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic EC2 scaling",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Container orchestration",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Git repository management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is secret rotation in the context of Secrets Management?",
        "options": [
          {
            "id": "a",
            "text": "Deleting secrets permanently",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Regularly changing credentials automatically",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Moving secrets between servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypting Docker images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A security team wants to know who accessed a secret and when it was accessed. Which capability provided by Vault and AWS Secrets Manager helps with this?",
        "options": [
          {
            "id": "a",
            "text": "Audit Logging",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Monitoring",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Caching",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of Security Automation in a DevOps environment?",
        "options": [
          {
            "id": "a",
            "text": "Reduce manual security tasks and improve consistency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increase application downtime",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace all security teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove CI/CD pipelines",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company automatically scans source code and container images for vulnerabilities whenever code is pushed to GitHub. This is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Security Automation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Auditing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database Replication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can be automated in a DevSecOps pipeline?",
        "options": [
          {
            "id": "a",
            "text": "Vulnerability Scanning",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Secrets Detection",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Compliance Checks",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "Your organization wants to prevent developers from accidentally committing passwords and API keys to Git repositories. Which automated security practice can help?",
        "options": [
          {
            "id": "a",
            "text": "Secrets Scanning",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Testing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Application Logging",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Balancing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer integrates Vault with Kubernetes so that applications can securely retrieve credentials when they start. What is the main benefit of this setup?",
        "options": [
          {
            "id": "a",
            "text": "Eliminates the need for containers",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Avoids hardcoded credentials and improves security",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Increases application latency",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes access controls",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the combined role of Vault, AWS Secrets Manager, and Security Automation in modern DevSecOps practices?",
        "options": [
          {
            "id": "a",
            "text": "Securely manage secrets and automate security controls throughout the software lifecycle",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud providers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate the need for authentication",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage only application performance",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 3,
    "topic_sort": 5,
    "topic_title": "AI-Assisted Infrastructure Generation",
    "quiz_title": "AI-Assisted Infrastructure Generation — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants ChatGPT to generate Terraform code for creating an AWS EC2 instance. What should be provided to the AI first?",
        "options": [
          {
            "id": "a",
            "text": "Clear infrastructure requirements",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AWS billing information",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Laptop specifications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Company logo",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary benefit of using AI tools for infrastructure generation?",
        "options": [
          {
            "id": "a",
            "text": "Reduce manual coding effort",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Replace cloud providers",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Eliminate testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Remove security requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A cloud engineer asks an AI tool to generate a VPC with public and private subnets. Before deploying the generated code, what should be done?",
        "options": [
          {
            "id": "a",
            "text": "Deploy directly to production",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and validate the generated configuration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the code",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable security groups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can AI assist with when working on cloud infrastructure?",
        "options": [
          {
            "id": "a",
            "text": "Generating Terraform templates",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Creating CloudFormation scripts",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Suggesting architecture improvements",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "You want ChatGPT to generate Terraform code for an EC2 instance, security group, and S3 bucket. Which prompt is likely to produce the best result?",
        "options": [
          {
            "id": "a",
            "text": "Create AWS resources",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Terraform",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Generate Terraform code to create an EC2 instance, security group allowing SSH access, and an S3 bucket in AWS",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Cloud Setup",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI-generated Terraform script contains a configuration that exposes all ports to the internet. What should the engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and fix the security configuration",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore the issue",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Delete Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which skill helps engineers get more accurate infrastructure code from AI tools?",
        "options": [
          {
            "id": "a",
            "text": "Prompt Engineering",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Graphic Design",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Video Editing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Database Administration",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team uses AI to generate infrastructure templates but still performs manual reviews. Why is this considered a best practice?",
        "options": [
          {
            "id": "a",
            "text": "AI outputs may contain errors, security issues, or incorrect assumptions",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AI cannot generate code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform does not work with AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Cloud providers do not support automation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of AI-assisted infrastructure generation for beginners?",
        "options": [
          {
            "id": "a",
            "text": "Helps learn infrastructure concepts faster through examples",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need to understand cloud services",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removes the need for testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Automatically guarantees secure infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to accelerate cloud deployments while maintaining engineering oversight. What is the most effective use of AI-assisted infrastructure generation?",
        "options": [
          {
            "id": "a",
            "text": "Generate infrastructure code, review it, test it, and then deploy",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy all AI-generated code directly to production",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replace all DevOps engineers with AI",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Skip validation and testing",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 1,
    "topic_title": "Prometheus, Grafana",
    "quiz_title": "Prometheus, Grafana — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "Your production application is running slowly and the operations team wants to monitor CPU, memory, and disk usage of servers in real time. Which tool is primarily responsible for collecting and storing these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Grafana",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Prometheus",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Jenkins",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to create visual dashboards showing application health, CPU utilization, and request latency. Which tool is best suited for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Grafana",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Docker",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ansible",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a monitoring setup, what is the primary role of Prometheus?",
        "options": [
          {
            "id": "a",
            "text": "Visualize metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Store and collect metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploy applications",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage containers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A team wants to monitor Kubernetes Pods and Nodes. Prometheus collects metrics from exporters and stores them. What does Grafana typically do with these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Deletes them",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Visualizes them in dashboards",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deploys them",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Encrypts them",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your web application becomes unavailable. Which Prometheus feature can automatically notify the operations team when predefined conditions are met?",
        "options": [
          {
            "id": "a",
            "text": "Dashboards",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Alerting Rules",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Containers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Workspaces",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to know whether a server's CPU usage exceeded 90% during the last hour. Which combination of tools is most commonly used?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus for metrics and Grafana for visualization",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Jenkins and GitHub Actions",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Terraform and Ansible",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Docker and Kubernetes",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application is exposing metrics at '/metrics'. What is the process called when Prometheus periodically collects these metrics?",
        "options": [
          {
            "id": "a",
            "text": "Pulling/Scraping",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Pushing",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replication",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to monitor the number of HTTP requests received by its application every minute. Which type of information is Prometheus designed to collect?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Source Code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Docker Images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Secrets",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your manager asks for a dashboard displaying CPU usage, memory consumption, disk utilization, and application response times on a single screen. Which Grafana feature should you use?",
        "options": [
          {
            "id": "a",
            "text": "Dashboard",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Volume",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Playbook",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production server goes down at 2:00 AM. The DevOps team receives an automatic email notification. Which monitoring capability enabled this?",
        "options": [
          {
            "id": "a",
            "text": "Visualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Alerting",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Containerization",
            "is_correct": false
          }
        ]
      },
      {
        "question": "You want to monitor multiple Linux servers. Which component is commonly installed on servers to expose system metrics such as CPU, memory, and disk usage to Prometheus?",
        "options": [
          {
            "id": "a",
            "text": "Node Exporter",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Docker Hub",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Helm Chart",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "GitHub Runner",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer notices a spike in application latency on a Grafana dashboard. What should be the next logical step?",
        "options": [
          {
            "id": "a",
            "text": "Investigate the underlying metrics and system health",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the dashboard",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Restart Grafana immediately",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the spike",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which real-world use case best demonstrates the value of Prometheus and Grafana?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring application and infrastructure health",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Writing source code",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating cloud accounts",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing DNS records",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your organization wants to track trends in application performance over time rather than only viewing current values. Why is Prometheus useful in this scenario?",
        "options": [
          {
            "id": "a",
            "text": "It stores historical metrics data",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It creates Docker images",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It manages CI/CD pipelines",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It provisions infrastructure",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production-ready monitoring solution is being designed. Which statement best describes how Prometheus and Grafana work together?",
        "options": [
          {
            "id": "a",
            "text": "Prometheus collects and stores metrics, while Grafana visualizes and analyzes them",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Grafana collects metrics and Prometheus creates dashboards",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Both tools perform the same function",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Prometheus replaces Grafana completely",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 2,
    "topic_title": "Metrics, Logs, Traces",
    "quiz_title": "Metrics, Logs, Traces — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A DevOps engineer wants to monitor CPU utilization of a production server over the last 24 hours. Which observability data type is most suitable for this purpose?",
        "options": [
          {
            "id": "a",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Alerts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your application suddenly starts throwing 'Database Connection Failed' errors. Which observability data type would provide detailed error messages to help investigate the issue?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Logs",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Dashboards",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A user reports that a request is taking 10 seconds to complete. You need to identify which service in a microservices architecture is causing the delay. Which observability data type is most useful?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Alerts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Metric?",
        "options": [
          {
            "id": "a",
            "text": "User login failed due to invalid password",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "CPU usage is 85%",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "API request passed through 5 services",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application stack trace",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of a Log entry?",
        "options": [
          {
            "id": "a",
            "text": "Memory usage is 70%",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Request latency is 200ms",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ERROR: Unable to connect to database",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "Service A called Service B",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes a Trace in a distributed application?",
        "options": [
          {
            "id": "a",
            "text": "A collection of system resource statistics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A record of events generated by applications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The complete journey of a request across multiple services",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "A monitoring dashboard",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Your monitoring dashboard shows that API response time has increased significantly. What should you check next to understand the root cause?",
        "options": [
          {
            "id": "a",
            "text": "Logs and Traces",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the dashboard",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Restart all servers immediately",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production application consists of multiple microservices. One service is causing slow responses, but it is unclear which one. Which observability component helps identify the exact service responsible?",
        "options": [
          {
            "id": "a",
            "text": "Metrics",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Traces",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Logs Only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Backups",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team wants to know how many requests per second their application is handling. Which observability data type provides this information most effectively?",
        "options": [
          {
            "id": "a",
            "text": "Logs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Metrics",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Traces",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Events",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Metrics, Logs, and Traces in modern observability?",
        "options": [
          {
            "id": "a",
            "text": "They provide different views of system health and work together for troubleshooting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Metrics replace Logs and Traces",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Logs are the only required observability data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Traces are used only for security",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 3,
    "topic_title": "Incident Response, AIOps",
    "quiz_title": "Incident Response, AIOps — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "A production application suddenly becomes unavailable and customers are unable to access the service. What is the first step in a typical incident response process?",
        "options": [
          {
            "id": "a",
            "text": "Ignore the issue",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Identify and assess the incident",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Delete the application",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy a new feature",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is Incident Response in a DevOps or SRE environment?",
        "options": [
          {
            "id": "a",
            "text": "Developing new features",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The process of detecting, responding to, and resolving service disruptions",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Creating Docker images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing source code",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A monitoring system detects that a web server is down and automatically notifies the operations team. Which phase of incident response is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Detection and Alerting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deployment",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Documentation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer receives an alert that CPU utilization on a production server has exceeded 95%. What should be done before taking corrective action?",
        "options": [
          {
            "id": "a",
            "text": "Investigate the root cause of the issue",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Delete the server",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Ignore the alert",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "After resolving a major outage, the team conducts a meeting to analyze what happened and how similar incidents can be prevented. What is this activity called?",
        "options": [
          {
            "id": "a",
            "text": "Code Review",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Post-Incident Review",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deployment Planning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A database service crashes unexpectedly. The monitoring system automatically restarts the service without human intervention. This is an example of:",
        "options": [
          {
            "id": "a",
            "text": "Manual Remediation",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Auto-Remediation",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment Rollback",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Capacity Planning",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does AIOps stand for?",
        "options": [
          {
            "id": "a",
            "text": "Artificial Intelligence for Operations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automated Infrastructure Operations",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Application Integration Operations",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Advanced Internet Operations",
            "is_correct": false
          }
        ]
      },
      {
        "question": "The primary goal of AIOps is to:",
        "options": [
          {
            "id": "a",
            "text": "Replace cloud infrastructure",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Use AI and machine learning to improve IT operations",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Eliminate automation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company collects thousands of logs every minute. An AIOps platform analyzes the logs and identifies unusual patterns before an outage occurs. What capability is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Predictive Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Version Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Balancing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AIOps system detects abnormal memory consumption and predicts a service failure before users are impacted. What is the main benefit of this approach?",
        "options": [
          {
            "id": "a",
            "text": "Proactive Issue Detection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Manual Troubleshooting",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced Monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increased Downtime",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps team uses AI to analyze application logs and automatically suggest the most likely root cause of an incident. Which AIOps capability is being used?",
        "options": [
          {
            "id": "a",
            "text": "Root Cause Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Version Control",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Management",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A production alert is triggered because response times have increased significantly. An AIOps platform correlates metrics, logs, and traces to identify the problem. What is the main advantage of this process?",
        "options": [
          {
            "id": "a",
            "text": "Faster Incident Resolution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "More Manual Work",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduced Visibility",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increased Costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following tasks can be enhanced by AIOps?",
        "options": [
          {
            "id": "a",
            "text": "Incident Detection",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Root Cause Analysis",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Alert Correlation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company wants to reduce alert fatigue by automatically grouping related alerts into a single incident. Which AIOps capability helps achieve this?",
        "options": [
          {
            "id": "a",
            "text": "Alert Correlation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Orchestration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Source Control",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Load Testing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between Incident Response and AIOps?",
        "options": [
          {
            "id": "a",
            "text": "AIOps helps detect, analyze, and resolve incidents faster through automation and intelligence",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "AIOps replaces Incident Response completely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Incident Response is only used when AIOps fails",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They are unrelated concepts",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 4,
    "topic_title": "AI-Powered Log Analysis",
    "quiz_title": "AI-Powered Log Analysis — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A production application generates thousands of log entries every minute. What is the primary benefit of using AI-powered log analysis instead of manually reviewing logs?",
        "options": [
          {
            "id": "a",
            "text": "Faster identification of issues and patterns",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Increases server downtime",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Removes the need for monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deletes unnecessary logs automatically",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer wants to identify unusual application behavior from millions of log entries. Which AI capability is most useful for this task?",
        "options": [
          {
            "id": "a",
            "text": "Anomaly Detection",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Containerization",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load Balancing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Version Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI system analyzes logs and detects a sudden increase in 'Database Connection Timeout' errors. What is the main advantage of this detection?",
        "options": [
          {
            "id": "a",
            "text": "Early identification of potential incidents",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic deployment of applications",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creation of new databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduction of log storage",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company receives thousands of alerts daily. AI-powered log analysis groups similar errors together to reduce alert fatigue. What capability is being demonstrated?",
        "options": [
          {
            "id": "a",
            "text": "Log Correlation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Container Orchestration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Infrastructure Provisioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Source Control",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI tool reviews application logs and suggests that a memory leak is causing performance degradation. What type of analysis is the AI performing?",
        "options": [
          {
            "id": "a",
            "text": "Root Cause Analysis",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Network Provisioning",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Code Compilation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Deployment",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which type of log entry would most likely indicate an application error?",
        "options": [
          {
            "id": "a",
            "text": "INFO: User logged in successfully",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "INFO: Service started",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "ERROR: Database connection failed",
            "is_correct": true
          },
          {
            "id": "d",
            "text": "INFO: Configuration loaded",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A DevOps engineer uses an AI assistant to analyze logs after a production outage. What is the most likely outcome?",
        "options": [
          {
            "id": "a",
            "text": "Faster troubleshooting and issue resolution",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Automatic cloud migration",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Database creation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application redesign",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An AI-powered monitoring platform detects a recurring pattern of errors every day at midnight. What valuable insight can this provide?",
        "options": [
          {
            "id": "a",
            "text": "A scheduled process may be causing the issue",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The application is secure",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The logs can be deleted",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The server no longer requires monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is one major advantage of combining AI-powered log analysis with monitoring tools like Prometheus and Grafana?",
        "options": [
          {
            "id": "a",
            "text": "Better visibility into system health and faster incident investigation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Eliminates the need for logs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Replaces cloud infrastructure",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Removes the need for DevOps engineers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes AI-powered log analysis in modern DevOps environments?",
        "options": [
          {
            "id": "a",
            "text": "It uses AI to analyze large volumes of logs, detect anomalies, and accelerate troubleshooting",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It replaces application logging completely",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It only works with Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It is used only for storing logs",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 5,
    "topic_title": "SRE — SLIs, SLOs, Error Budgets",
    "quiz_title": "SRE — SLIs, SLOs, Error Budgets — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "What does SRE stand for in modern cloud and DevOps environments?",
        "options": [
          {
            "id": "a",
            "text": "System Reliability Engineering",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Site Reliability Engineering",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Software Resource Engineering",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Security Reliability Engineering",
            "is_correct": false
          }
        ]
      },
      {
        "question": "The primary goal of Site Reliability Engineering (SRE) is to:",
        "options": [
          {
            "id": "a",
            "text": "Deploy applications manually",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Improve system reliability, scalability, and performance",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Replace DevOps teams",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Manage source code repositories",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to measure the percentage of successful API requests served by its application. Which SRE concept is being used?",
        "options": [
          {
            "id": "a",
            "text": "Error Budget",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SLI",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Deployment Strategy",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "CI/CD",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does SLI stand for?",
        "options": [
          {
            "id": "a",
            "text": "Service Level Indicator",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "System Level Indicator",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service Load Index",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "System Load Indicator",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is an example of an SLI?",
        "options": [
          {
            "id": "a",
            "text": "API availability percentage",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Number of developers in the team",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Cloud provider name",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Application source code size",
            "is_correct": false
          }
        ]
      },
      {
        "question": "An organization defines that its application should be available 99.9% of the time each month. Which SRE concept does this represent?",
        "options": [
          {
            "id": "a",
            "text": "SLI",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "SLO",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Error Log",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Incident",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does SLO stand for?",
        "options": [
          {
            "id": "a",
            "text": "Service Level Objective",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "System Level Objective",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Service Load Objective",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "System Load Operation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes an SLO?",
        "options": [
          {
            "id": "a",
            "text": "A measurable target for service reliability or performance",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A log generated by an application",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A monitoring dashboard",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A deployment script",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company defines an SLO of 99.95% uptime. What is the purpose of setting such a target?",
        "options": [
          {
            "id": "a",
            "text": "To establish reliability expectations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase cloud costs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To replace monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To eliminate incidents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an Error Budget in SRE?",
        "options": [
          {
            "id": "a",
            "text": "The budget allocated for cloud services",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The amount of acceptable downtime or failure within an SLO target",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The cost of monitoring tools",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The number of incidents reported",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A service has an SLO of 99.9% uptime. Which statement about its Error Budget is correct?",
        "options": [
          {
            "id": "a",
            "text": "0.1% downtime is acceptable within the defined period",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "No downtime is allowed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "10% downtime is acceptable",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The service does not require monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development team has exhausted its Error Budget due to multiple production incidents. What is the most appropriate action according to SRE practices?",
        "options": [
          {
            "id": "a",
            "text": "Focus on reliability improvements before releasing more features",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Deploy more features immediately",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disable monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore the incidents",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which metric would be commonly used as an SLI for a web application?",
        "options": [
          {
            "id": "a",
            "text": "Request Latency",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Availability",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Error Rate",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A payment application has an SLO stating that 95% of transactions must complete within 2 seconds. Which aspect of reliability is being measured?",
        "options": [
          {
            "id": "a",
            "text": "Performance and Latency",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Infrastructure Cost",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deployment Frequency",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Source Code Quality",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes the relationship between SLIs, SLOs, and Error Budgets?",
        "options": [
          {
            "id": "a",
            "text": "SLIs measure performance, SLOs define targets, and Error Budgets define acceptable failure levels",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "SLIs replace SLOs",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Error Budgets eliminate incidents",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All three concepts are unrelated",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "DOP",
    "module_number": 4,
    "topic_sort": 6,
    "topic_title": "Cost Optimization, Production Readiness Reviews",
    "quiz_title": "Cost Optimization, Production Readiness Reviews — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "A company notices that several EC2 instances are running continuously even though they are only needed during business hours. Which cost optimization action would be most effective?",
        "options": [
          {
            "id": "a",
            "text": "Increase instance size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Schedule instances to stop when not in use",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create additional instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable monitoring",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the primary goal of cloud cost optimization?",
        "options": [
          {
            "id": "a",
            "text": "Increase cloud spending",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Reduce costs while maintaining performance and reliability",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Eliminate monitoring",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Replace automation tools",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A development environment has been idle for several weeks but is still generating cloud costs. What should a DevOps engineer do?",
        "options": [
          {
            "id": "a",
            "text": "Scale it up",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Review and remove or shut down unused resources",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Ignore it",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploy more applications",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which cloud resource is commonly reviewed first when looking for opportunities to reduce infrastructure costs?",
        "options": [
          {
            "id": "a",
            "text": "Compute Instances",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Unused Storage",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Idle Load Balancers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A company is paying for a large EC2 instance, but monitoring shows that CPU utilization rarely exceeds 15%. What cost optimization recommendation is most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Increase the instance size",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Right-size the instance to a smaller type",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Create duplicate instances",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Disable CloudWatch",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Before deploying a new application to production, the engineering team performs a review to ensure scalability, security, monitoring, and reliability requirements are met. What is this process called?",
        "options": [
          {
            "id": "a",
            "text": "Code Commit",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Production Readiness Review",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Cost Allocation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Container Build",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following areas is commonly evaluated during a Production Readiness Review?",
        "options": [
          {
            "id": "a",
            "text": "Monitoring and Alerting",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Security",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Backup and Recovery",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "All of the Above",
            "is_correct": true
          }
        ]
      },
      {
        "question": "A new application is ready for deployment, but no monitoring or alerting has been configured. According to Production Readiness best practices, what should happen?",
        "options": [
          {
            "id": "a",
            "text": "Deploy immediately",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Complete monitoring and alerting setup before production release",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Disable logging permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Ignore observability requirements",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why is a Production Readiness Review important before launching a critical application?",
        "options": [
          {
            "id": "a",
            "text": "It helps identify risks and operational gaps before users are impacted",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It guarantees zero downtime forever",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces testing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It eliminates the need for documentation",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best combines the goals of Cost Optimization and Production Readiness Reviews?",
        "options": [
          {
            "id": "a",
            "text": "Build systems that are reliable, secure, observable, and cost-efficient before going live",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Reduce all cloud costs regardless of performance impact",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Deploy applications without validation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Focus only on infrastructure costs",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 1,
    "topic_title": "Tokens & embeddings",
    "quiz_title": "Tokens & embeddings — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "When using Large Language Models (LLMs) like ChatGPT, what is a token?",
        "options": [
          {
            "id": "a",
            "text": "A complete paragraph",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A unit of text processed by the model",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A database record",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A machine learning algorithm",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why do AI models use tokens instead of processing entire documents at once?",
        "options": [
          {
            "id": "a",
            "text": "To make storage easier",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "To break text into manageable units for processing",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "To increase internet speed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To reduce cloud costs only",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement best describes tokenization?",
        "options": [
          {
            "id": "a",
            "text": "Converting images into videos",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Splitting text into smaller units called tokens",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Encrypting user data",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Compressing databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What happens if a prompt contains more tokens than a model's context window allows?",
        "options": [
          {
            "id": "a",
            "text": "The model crashes",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The extra tokens are ignored or truncated",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "The prompt becomes encrypted",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The model learns permanently from the prompt",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In Generative AI, what is an embedding?",
        "options": [
          {
            "id": "a",
            "text": "A type of database",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A numerical representation of data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A programming language",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud service",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are embeddings important in modern AI applications?",
        "options": [
          {
            "id": "a",
            "text": "They replace GPUs",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They help measure similarity between pieces of data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They increase internet speed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They remove the need for prompts",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which real-world AI feature commonly uses embeddings?",
        "options": [
          {
            "id": "a",
            "text": "Semantic Search",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Keyboard Backlight",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Disk Partitioning",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network Routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the main difference between tokens and embeddings?",
        "options": [
          {
            "id": "a",
            "text": "Tokens are text units, embeddings are numerical representations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Both are exactly the same",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embeddings are larger versions of tokens",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Tokens only work for images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which AI application heavily relies on embeddings for retrieving relevant documents?",
        "options": [
          {
            "id": "a",
            "text": "RAG (Retrieval-Augmented Generation)",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "FTP Server",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Load Balancer",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "VPN Gateway",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a vector database?",
        "options": [
          {
            "id": "a",
            "text": "A database optimized for storing embeddings",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "A database used only for videos",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "A database without indexing",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A cloud backup tool",
            "is_correct": false
          }
        ]
      },
      {
        "question": "When two embeddings are very close in vector space, what does it usually indicate?",
        "options": [
          {
            "id": "a",
            "text": "The content is semantically similar",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The data is corrupted",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The model failed",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The tokens are duplicated",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which of the following is a common use case for embeddings in enterprise AI systems?",
        "options": [
          {
            "id": "a",
            "text": "Document Search",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Network Cabling",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Operating System Installation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Hardware Manufacturing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are embeddings frequently used in AI chatbots?",
        "options": [
          {
            "id": "a",
            "text": "To help retrieve relevant context before generating answers",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To improve monitor resolution",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To install software packages",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To manage cloud billing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which statement about embeddings is true?",
        "options": [
          {
            "id": "a",
            "text": "Embeddings capture meaning, not just exact words",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Embeddings only work with English",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Embeddings replace language models",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Embeddings are used only in databases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company wants to build an AI knowledge assistant that answers questions from internal documents. Which combination would most likely be used?",
        "options": [
          {
            "id": "a",
            "text": "Embeddings + Vector Database + LLM",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Only HTML and CSS",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Firewall + Router",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Docker + Kubernetes only",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 2,
    "topic_title": "Transformers",
    "quiz_title": "Transformers — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 30,
    "questions": [
      {
        "question": "What is the primary purpose of the Transformer architecture in AI?",
        "options": [
          {
            "id": "a",
            "text": "Image compression",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Understanding relationships within sequences of data",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Database optimization",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Network routing",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which breakthrough paper introduced the Transformer architecture?",
        "options": [
          {
            "id": "a",
            "text": "Deep Learning Revolution",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Attention Is All You Need",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Neural Networks Explained",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The Future of AI",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the key innovation that makes Transformers different from RNNs and LSTMs?",
        "options": [
          {
            "id": "a",
            "text": "Convolution",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Self-Attention",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Virtual Machines",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Caching",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does Self-Attention help a Transformer model do?",
        "options": [
          {
            "id": "a",
            "text": "Increase internet speed",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Focus on important words in a sequence",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Store data permanently",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Reduce cloud costs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are Transformers faster to train than traditional RNN-based models?",
        "options": [
          {
            "id": "a",
            "text": "They use SSD storage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They process tokens in parallel",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They require less memory always",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They use fewer parameters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "In a Transformer model, what are tokens?",
        "options": [
          {
            "id": "a",
            "text": "Database records",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Units of text processed by the model",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Cloud servers",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Neural network layers",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the role of positional encoding in Transformers?",
        "options": [
          {
            "id": "a",
            "text": "Store passwords",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Provide information about token order",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Compress embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Generate images",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which modern AI models are based on the Transformer architecture?",
        "options": [
          {
            "id": "a",
            "text": "ChatGPT, Gemini, Claude",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "MySQL, PostgreSQL",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Docker, Kubernetes",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Terraform, Ansible",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is an embedding in the context of Transformers?",
        "options": [
          {
            "id": "a",
            "text": "A storage device",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "A numerical representation of tokens",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A type of API",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A database query",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which component allows Transformers to understand context from earlier and later words in a sentence?",
        "options": [
          {
            "id": "a",
            "text": "Virtualization",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "Self-Attention Mechanism",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "Caching Engine",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Operating System",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is a context window in Transformer-based models?",
        "options": [
          {
            "id": "a",
            "text": "The number of users supported",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "The maximum number of tokens the model can process at once",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "A cloud region",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "A GPU type",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Why are larger context windows useful in modern LLMs?",
        "options": [
          {
            "id": "a",
            "text": "They reduce internet usage",
            "is_correct": false
          },
          {
            "id": "b",
            "text": "They allow the model to remember and analyze more information",
            "is_correct": true
          },
          {
            "id": "c",
            "text": "They eliminate embeddings",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "They replace GPUs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the Encoder component mainly responsible for in a Transformer?",
        "options": [
          {
            "id": "a",
            "text": "Understanding and encoding input information",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Generating invoices",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Managing databases",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Deploying applications",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the Decoder component mainly responsible for?",
        "options": [
          {
            "id": "a",
            "text": "Generating output based on learned representations",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Installing software",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Creating cloud infrastructure",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Managing APIs",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company is building a chatbot that can answer questions from documents, generate summaries, and assist users. Why would a Transformer-based model be a good choice?",
        "options": [
          {
            "id": "a",
            "text": "It understands context, generates human-like responses, and scales well across NLP tasks",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "It removes the need for training data",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "It replaces databases completely",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "It works without tokens",
            "is_correct": false
          }
        ]
      }
    ]
  },
  {
    "course_code": "AAC",
    "module_number": 1,
    "topic_sort": 3,
    "topic_title": "Sampling parameters",
    "quiz_title": "Sampling parameters — Topic Quiz",
    "pass_score": 70,
    "max_attempts": 3,
    "time_limit_min": 20,
    "questions": [
      {
        "question": "What is the primary purpose of sampling parameters in Large Language Models (LLMs)?",
        "options": [
          {
            "id": "a",
            "text": "To control how the model generates responses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "To increase internet speed",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "To train the model from scratch",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "To store embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which sampling parameter is most commonly used to control the randomness of a model's response?",
        "options": [
          {
            "id": "a",
            "text": "Temperature",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Embedding Size",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Context Length",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Token Count",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What typically happens when the Temperature value is set very low (e.g., 0.1)?",
        "options": [
          {
            "id": "a",
            "text": "Responses become more predictable and focused",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Responses become highly creative",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The model generates images",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The context window increases",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the effect of setting a high Temperature value (e.g., 1.5)?",
        "options": [
          {
            "id": "a",
            "text": "More creative and diverse responses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Shorter context windows",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Faster model training",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "More embeddings generated",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What does the Top-P (Nucleus Sampling) parameter control?",
        "options": [
          {
            "id": "a",
            "text": "The set of most probable tokens considered during generation",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The size of the model",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The number of GPUs",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The length of embeddings",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A Top-P value of 0.9 means what?",
        "options": [
          {
            "id": "a",
            "text": "The model considers tokens that make up the top 90% cumulative probability",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "The model generates exactly 90 tokens",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "The model uses 90% of its memory",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "The model trains 90% faster",
            "is_correct": false
          }
        ]
      },
      {
        "question": "What is the purpose of the Top-K parameter?",
        "options": [
          {
            "id": "a",
            "text": "Limit token selection to the K most probable tokens",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Limit context length",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Reduce model size",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Increase embedding dimensions",
            "is_correct": false
          }
        ]
      },
      {
        "question": "When would you typically use a low Temperature and low Top-P setting?",
        "options": [
          {
            "id": "a",
            "text": "For factual and consistent responses",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "For creative storytelling",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "For image generation",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "For model training",
            "is_correct": false
          }
        ]
      },
      {
        "question": "Which combination is generally better for creative content generation?",
        "options": [
          {
            "id": "a",
            "text": "Higher Temperature and higher Top-P",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "Lower Temperature and lower Top-P",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Temperature 0 only",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "No sampling parameters",
            "is_correct": false
          }
        ]
      },
      {
        "question": "A company is building an AI-powered customer support chatbot that must provide accurate and consistent answers. Which configuration would be most appropriate?",
        "options": [
          {
            "id": "a",
            "text": "Low Temperature and moderate Top-P",
            "is_correct": true
          },
          {
            "id": "b",
            "text": "High Temperature and high Top-P",
            "is_correct": false
          },
          {
            "id": "c",
            "text": "Maximum randomness",
            "is_correct": false
          },
          {
            "id": "d",
            "text": "Random parameter values for every request",
            "is_correct": false
          }
        ]
      }
    ]
  }
]
$catalog$::jsonb) AS x(
      course_code text,
      module_number int,
      topic_sort int,
      topic_title text,
      quiz_title text,
      pass_score int,
      max_attempts int,
      time_limit_min int,
      questions jsonb
    )
  LOOP
    SELECT id INTO v_course_id
    FROM public.courses
    WHERE upper(code) = upper(entry.course_code)
    LIMIT 1;

    IF v_course_id IS NULL THEN
      RAISE NOTICE 'Course % not found — skipping quiz %', entry.course_code, entry.quiz_title;
      CONTINUE;
    END IF;

    SELECT id INTO v_module_id
    FROM public.program_modules
    WHERE course_id = v_course_id AND module_number = entry.module_number
    LIMIT 1;

    IF v_module_id IS NULL THEN
      RAISE NOTICE 'Module % for % not found — run seed_lms_curriculum() first', entry.module_number, entry.course_code;
      CONTINUE;
    END IF;

    IF entry.topic_title IS NOT NULL THEN
      UPDATE public.module_topics
      SET title = entry.topic_title, is_published = true
      WHERE module_id = v_module_id AND sort_order = entry.topic_sort;
    END IF;

    SELECT id INTO v_topic_id
    FROM public.module_topics
    WHERE module_id = v_module_id AND sort_order = entry.topic_sort
    LIMIT 1;

    IF v_topic_id IS NULL THEN
      RAISE NOTICE 'Topic sort % not found for % M% — skipping', entry.topic_sort, entry.course_code, entry.module_number;
      CONTINUE;
    END IF;

    INSERT INTO public.quizzes (course_id, topic_id, title, pass_score, max_attempts, time_limit_min, is_published)
    SELECT v_course_id, v_topic_id, entry.quiz_title, entry.pass_score, entry.max_attempts, entry.time_limit_min, true
    WHERE NOT EXISTS (SELECT 1 FROM public.quizzes existing_quiz WHERE existing_quiz.topic_id = v_topic_id);

    SELECT id INTO v_quiz_id FROM public.quizzes WHERE topic_id = v_topic_id LIMIT 1;

    UPDATE public.quizzes
    SET
      title = entry.quiz_title,
      pass_score = entry.pass_score,
      max_attempts = entry.max_attempts,
      time_limit_min = entry.time_limit_min
    WHERE id = v_quiz_id;

    v_expected := jsonb_array_length(entry.questions);
    SELECT count(*)::int INTO v_existing FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

    IF v_existing = v_expected THEN
      RAISE NOTICE 'Quiz already seeded: % (% questions)', entry.quiz_title, v_existing;
      CONTINUE;
    END IF;

    DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id;

    v_sort := 0;
    FOR v_question IN SELECT * FROM jsonb_to_recordset(entry.questions) AS r(question text, options jsonb)
    LOOP
      v_sort := v_sort + 1;
      INSERT INTO public.quiz_questions (quiz_id, question_text, options, sort_order)
      VALUES (v_quiz_id, v_question.question, v_question.options, v_sort);
    END LOOP;

    RAISE NOTICE 'Seeded quiz: % (% questions)', entry.quiz_title, v_sort;
  END LOOP;
END;
$$;

SELECT public.seed_topic_quizzes();
