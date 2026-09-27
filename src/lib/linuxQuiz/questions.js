export const QUESTIONS = [
  {
    q: "What is the default number of lines that the `head` command displays?",
    options: ["5", "10", "15", "20"],
  },
  {
    q: "Which command displays the last lines of a file and is commonly used for real-time log monitoring?",
    options: ["cat", "head", "tail", "less"],
  },
  {
    q: "Which flag do you use with `tail` to continuously monitor a file as it grows?",
    options: ["-c", "-n", "-f", "-m"],
  },
  {
    q: "Which command is best suited for reading very large files page by page without loading the whole file at once?",
    options: ["cat", "less", "head", "grep"],
  },
  {
    q: "In `less`, which key is used to quit?",
    options: ["x", "q", "e", "c"],
  },
  {
    q: "Which command combines/displays file contents and can also create files?",
    options: ["less", "cat", "find", "grep"],
  },
  {
    q: "Which command would you use to view the contents of `/etc/os-release`?",
    options: [
      "cat /etc/os-release",
      "find /etc/os-release",
      "grep /etc/os-release",
      "chmod /etc/os-release",
    ],
  },
  {
    q: "Which command searches files and directories recursively by name?",
    options: ["grep", "find", "locate", "ls"],
  },
  {
    q: "Which `find` option restricts the search to directories only?",
    options: ["-type f", "-type d", "-name d", "-dir"],
  },
  {
    q: "Which command is used to search for text/patterns inside files?",
    options: ["find", "grep", "locate", "which"],
  },
  {
    q: "Which `grep` option makes the search case-insensitive?",
    options: ["-n", "-r", "-i", "-c"],
  },
  {
    q: "Which `grep` option shows the line numbers of matches?",
    options: ["-i", "-n", "-r", "-v"],
  },
  {
    q: "Which `grep` option allows recursive search through directories (e.g., in log folders)?",
    options: ["-i", "-n", "-r", "-l"],
  },
  {
    q: "In the permission string `-rwxr-xr--`, what do the middle three characters (r-x) represent?",
    options: [
      "Owner permissions",
      "Group permissions",
      "Others permissions",
      "File type",
    ],
  },
  {
    q: "Which command changes file permissions?",
    options: ["chown", "chmod", "chgrp", "usermod"],
  },
  {
    q: "What numeric value represents `rwx` permission?",
    options: ["4", "5", "6", "7"],
  },
  {
    q: "What numeric value represents `rw-` permission?",
    options: ["4", "5", "6", "7"],
  },
  {
    q: "Which command would give a script execute permission for the owner along with read/write, and read+execute for group/others?",
    options: ["chmod 777", "chmod 644", "chmod 755", "chmod 700"],
  },
  {
    q: "Which command changes the ownership of a file to a different user?",
    options: ["chmod", "chown", "chgrp", "usermod"],
  },
  {
    q: "Which command changes the group ownership of a file?",
    options: ["chmod", "chown", "chgrp", "groupadd"],
  },
  {
    q: "Which command shows the currently logged-in user?",
    options: ["id", "groups", "whoami", "users"],
  },
  {
    q: "Which command displays user ID, group ID, and group memberships?",
    options: ["whoami", "id", "groups", "su"],
  },
  {
    q: "Which command is used to create a new user account in Linux?",
    options: ["adduser only", "useradd", "newuser", "mkuser"],
  },
  {
    q: "Which command is used to set or change a user's password?",
    options: ["passwd", "chpasswd", "setpass", "userpass"],
  },
  {
    q: "Which command creates a new group?",
    options: ["groupadd", "usermod", "newgroup", "addgroup only"],
  },
  {
    q: "Which command allows you to switch to another user account?",
    options: ["sudo", "su", "chown", "passwd"],
  },
  {
    q: "Which command is used to run a single command with administrative/root privileges?",
    options: ["su", "sudo", "root", "admin"],
  },
  {
    q: "On Ubuntu/Debian systems, which command updates the package index?",
    options: ["apt install", "apt update", "apt upgrade", "apt refresh"],
  },
  {
    q: "Which command installs a new software package (e.g., nginx) on Ubuntu/Debian?",
    options: [
      "apt update nginx",
      "apt install nginx",
      "apt get nginx",
      "apt add nginx",
    ],
  },
  {
    q: "Which package managers are commonly used on RedHat/CentOS systems?",
    options: [
      "apt and dpkg",
      "yum, dnf, and rpm",
      "brew and port",
      "npm and pip",
    ],
  },
  {
    q: "Which command shows a real-time, interactive view of running processes?",
    options: ["ps", "top", "jobs", "bg"],
  },
  {
    q: "Which command is used to terminate a running process by its PID?",
    options: ["stop", "kill", "end", "terminate"],
  },
  {
    q: "Which command is used to start, stop, or check the status of a system service like nginx?",
    options: ["service-ctl", "systemctl", "svcmgr", "initctl"],
  },
  {
    q: "Which systemctl command would you use to check whether a service is currently running?",
    options: [
      "systemctl start nginx",
      "systemctl status nginx",
      "systemctl enable nginx",
      "systemctl reload nginx",
    ],
  },
  {
    q: "Which command shows network interface IP addresses in modern Linux systems?",
    options: ["ip a", "netcfg", "ipconfig", "route"],
  },
  {
    q: "Which command is used to test connectivity to another host over the network?",
    options: ["curl", "ping", "wget", "ssh"],
  },
  {
    q: "Which command is used to securely connect to a remote Linux server?",
    options: ["scp", "ssh", "ftp", "telnet"],
  },
  {
    q: "Which command is used to securely copy files between local and remote systems?",
    options: ["ssh", "scp", "rsync only", "cp -r"],
  },
  {
    q: "Which command displays disk space usage in human-readable format?",
    options: ["du -sh", "df -h", "free -m", "lsblk"],
  },
  {
    q: "Which command displays memory (RAM) usage in Linux?",
    options: ["df -h", "du -sh", "free -m", "top only"],
  },
  {
    q: "Which command displays the disk usage of a specific directory in human-readable form?",
    options: ["df -h", "du -sh", "free -m", "lsblk"],
  },
  {
    q: "Which command is used to create a compressed/archived tar file?",
    options: ["tar -xvf", "tar -cvf", "zip -r", "gzip -d"],
  },
  {
    q: "Which command is used to extract the contents of a tar archive?",
    options: ["tar -cvf", "tar -xvf", "tar -tvf", "tar -zvf"],
  },
  {
    q: "In a Bash script, what does the line `#!/bin/bash` represent?",
    options: [
      "A comment",
      "The shebang, specifying the interpreter",
      "A variable declaration",
      "An error message",
    ],
  },
  {
    q: "Which command is used to take user input inside a Bash script and store it in a variable?",
    options: ["input", "get", "read", "scan"],
  },
  {
    q: "In Bash `if` conditions, which operator checks whether a number is greater than another?",
    options: ["-eq", "-gt", "-lt", "-ne"],
  },
  {
    q: "Which loop repeats a block of code as long as a specified condition remains true?",
    options: ["for loop", "while loop", "do loop", "case statement"],
  },
  {
    q: "Which special variable represents the first argument passed to a Bash script?",
    options: ["$0", "$1", "$#", "$?"],
  },
  {
    q: "In Bash, which command is used to check the exit status of the last executed command?",
    options: ["echo $0", "echo $1", "echo $?", "echo $#"],
  },
  {
    q: "Which command is used to edit the scheduled cron jobs for automating recurring tasks?",
    options: ["cronjob -e", "crontab -e", "crond -e", "schedule -e"],
  },
  {
    q: "A production application is throwing intermittent errors. You need to inspect only the first 15 lines of the application log file app.log to read the startup parameters. Which command will you use?",
    options: [
      "tail -n 15 app.log",
      "head -15 app.log",
      "cat -n 15 app.log",
      "less +15 app.log",
    ],
  },
  {
    q: "Users are reporting 502 Bad Gateway errors right now. You need to monitor the incoming log entries in real-time as they hit nginx.log. Which command will you run?",
    options: [
      "cat nginx.log",
      "less nginx.log",
      "tail -f nginx.log",
      "head -f nginx.log",
    ],
  },
  {
    q: "You need to open a massive 10GB system log file without overloading the server's memory. Which command is best suited to open and read this file page-by-page efficiently?",
    options: ["cat", "less", "nano", "head"],
  },
  {
    q: 'You want to change a configuration parameter inside settings.conf directly from the terminal without opening an interactive editor. You need to replace STATUS="OFF" with STATUS="ON". Which sed command is correct?',
    options: [
      `sed 's/STATUS="OFF"/STATUS="ON"/' settings.conf`,
      `sed -i 's/STATUS="OFF"/STATUS="ON"/g' settings.conf`,
      `sed -replace 'STATUS="OFF"' with 'STATUS="ON"' settings.conf`,
      `sed -d 's/STATUS="OFF"/STATUS="ON"/' settings.conf`,
    ],
  },
  {
    q: "You have a comma-separated log file metrics.csv. The 3rd column contains IP addresses. Which awk command will correctly extract and print only the 3rd column?",
    options: [
      "awk -F',' '{print $3}' metrics.csv",
      "awk '{print column3}' metrics.csv",
      "awk -d ',' '{print $3}' metrics.csv",
      "awk -F ',' 'show $3' metrics.csv",
    ],
  },
  {
    q: "A supervisor asks you to print only lines 50 to 75 of a long text file named data.txt. Which sed command accomplishes this?",
    options: [
      "sed -n '50,75' data.txt",
      "sed '50-75p' data.txt",
      "sed -n '50,75p' data.txt",
      "sed -show 50,75 data.txt",
    ],
  },
  {
    q: "You suspect a large backup file named backup.tar.gz is wasting space inside the /var directory hierarchy. Which command will recursively search for it?",
    options: [
      'grep -r "backup.tar.gz" /var',
      'find /var -name "backup.tar.gz"',
      'locate -dir /var "backup.tar.gz"',
      'find "backup.tar.gz" /var',
    ],
  },
  {
    q: 'When running find / -name "secret.txt", your terminal screen gets flooded with "Permission denied" messages. How can you prevent these permission errors from showing up?',
    options: [
      "Append 2>/dev/null to redirect error streams to the null device.",
      "Use the -ignore-errors flag.",
      "Run the command inside a while loop.",
      "Change file permissions using chmod 777.",
    ],
  },
  {
    q: "You need to search for all occurrences of the word CRITICAL in a log file app.log. The search must be case-insensitive (matching 'critical', 'Critical', etc.) and display line numbers. Which command is correct?",
    options: [
      'grep -n -i "CRITICAL" app.log',
      'grep -v -n "CRITICAL" app.log',
      'find "CRITICAL" -in app.log',
      'grep -c "CRITICAL" app.log',
    ],
  },
  {
    q: "You are looking for a configuration string DB_PASSWORD across hundreds of files inside a nested source directory /var/www/html/. Which command will find it recursively?",
    options: [
      'find /var/www/html/ -search "DB_PASSWORD"',
      'grep -r "DB_PASSWORD" /var/www/html/',
      'cat /var/www/html/ | grep "DB_PASSWORD"',
      'sed -r "DB_PASSWORD" /var/www/html/',
    ],
  },
  {
    q: "Running ls -l deploy.sh reveals the current permissions are -rw-r--r--. You want to grant execution rights to the Owner only, leaving group and others unchanged. What is the correct command?",
    options: [
      "chmod +x deploy.sh",
      "chmod 744 deploy.sh",
      "chmod 755 deploy.sh",
      "chmod u-x deploy.sh",
    ],
  },
  {
    q: "A security audit flags a sensitive file because its current permissions are 777 (world-writable). You must restrict it so that the Owner has read/write, Group has read-only, and Others have no access. What is the correct numeric permission?",
    options: ["chmod 644", "chmod 750", "chmod 640", "chmod 600"],
  },
  {
    q: "A directory /opt/app currently belongs to root. You need to change both the owner to rahul and the group to devs. Which command does this in one go?",
    options: [
      "chown rahul:devs /opt/app",
      "chgrp rahul:devs /opt/app",
      "chown rahul -g devs /opt/app",
      "usermod -u rahul -g devs /opt/app",
    ],
  },
  {
    q: "Which sequence of commands will successfully create a new user account named devops_user and prompt you to establish their initial login password?",
    options: [
      "useradd devops_user followed by passwd devops_user",
      "adduser devops_user followed by chown devops_user",
      "createuser devops_user --password",
      "groupadd devops_user followed by usermod devops_user",
    ],
  },
  {
    q: "You are logged into a standard user account and need to invoke a privileged command (like installing a package). What command prefix acts as a temporary gateway to root privileges?",
    options: ["su", "runas", "sudo", "admin"],
  },
  {
    q: "On a Debian/Ubuntu infrastructure server, which combined commands will refresh the local package database and then upgrade all out-of-date system software packages?",
    options: [
      "apt update && apt upgrade",
      "apt download && apt install",
      "yum check-update && yum update",
      "systemctl update && systemctl upgrade",
    ],
  },
  {
    q: "Your web platform suddenly stops rendering pages. Which command lets you verify if the underlying Nginx process engine is active, stopped, or crashed?",
    options: [
      "nginx --check-status",
      "service nginx check",
      "systemctl status nginx",
      "ps -ef | start nginx",
    ],
  },
  {
    q: "A rogue application process with Process ID (PID) 8521 has frozen and is ignoring standard exit signals. Which command forces an immediate kernel-level termination of this process?",
    options: [
      "kill 8521",
      "kill -9 8521",
      "stop-process 8521",
      "killall 8521",
    ],
  },
  {
    q: "You suspect network dropouts between your app container and an external database node located at 10.0.0.5. Which tool continuously verifies network-layer reachability?",
    options: [
      "curl 10.0.0.5",
      "ifconfig 10.0.0.5",
      "ping 10.0.0.5",
      "netstat 10.0.0.5",
    ],
  },
  {
    q: "Which command displays the total available storage, mount paths, and utilized disk capacities across all system filesystems in a human-readable format?",
    options: ["du -sh", "df -h", "lsblk -m", "free -m"],
  },
  {
    q: "You are running intensive database queries and need to inspect current physical RAM usage along with swap memory allocations in megabytes. Which command provides this info?",
    options: ["top -ram", "df -m", "free -m", "vmstat -ram"],
  },
  {
    q: "You want to compute the total aggregate disk storage space consumed exclusively by the directory /var/log/nginx/ without listing every single file inside it. What command do you use?",
    options: [
      "df -h /var/log/nginx/",
      "du -sh /var/log/nginx/",
      "ls -la /var/log/nginx/",
      "size /var/log/nginx/",
    ],
  },
  {
    q: "You need to combine and compress a backup of the folder /home/ubuntu/data into a single archival file named backup.tar.gz. Which syntax is correct?",
    options: [
      "tar -cvf backup.tar.gz /home/ubuntu/data",
      "tar -xvf backup.tar.gz /home/ubuntu/data",
      "tar -czvf backup.tar.gz /home/ubuntu/data",
      "zip backup.tar.gz /home/ubuntu/data",
    ],
  },
  {
    q: "You scheduled physical data center server maintenance. You must command a clean system shutdown to execute exactly 10 minutes from now. Which command is correct?",
    options: [
      "shutdown now +10",
      "shutdown -h +10",
      "reboot +10",
      "init 0 +10",
    ],
  },
  {
    q: "You are building an evaluation routine to see if a numerical variable is greater than 10. Which script block is syntactically correct in Bash?",
    options: [
      '#!/bin/bash\nnum=15\nif [ num -gt 10 ]\nthen\n   echo "Greater"\nfi',
      '#!/bin/bash\nnum=15\nif [ $num -gt 10 ]\nthen\n   echo "Greater"\nfi',
      '#!/bin/bash\nnum = 15\nif [$num > 10]\nthen\n   echo "Greater"\nfi',
      '#!/bin/bash\nnum=15\nif ( $num -gt 10 )\n   echo "Greater"\nfi',
    ],
  },
  {
    q: "You want to pass a directory path dynamically as a command-line argument when executing a script (e.g., ./backup.sh /opt/data). Which variable parameter captures this first argument?",
    options: [
      '#!/bin/bash\necho "Target is: $1"',
      '#!/bin/bash\necho "Target is: $argument1"',
      '#!/bin/bash\necho "Target is: $#"',
      '#!/bin/bash\necho "Target is: $@"',
    ],
  },
  {
    q: "You need to write an input-validation check to verify if a candidate's age is 18 or older. Which implementation complies with standard Bash structural conventions?",
    options: [
      '#!/bin/bash\nage=18\nif [ $age >= 18 ]\n   echo "Eligible"\nfi',
      '#!/bin/bash\nage=18\nif ($age -ge 18) {\n   echo "Eligible"\n}',
      '#!/bin/bash\nage=18\nif [ $age -ge 18 ]\nthen\n   echo "Eligible"\nelse\n   echo "Not Eligible"\nfi',
      '#!/bin/bash\nage=18\nif [ $age -gt 18 ] : echo "Eligible" fi',
    ],
  },
  {
    q: "Which of the following examples represents a syntactically valid while loop implementation that prints increments up to 5 in Bash?",
    options: [
      "#!/bin/bash\ncount=1\nwhile [ $count -le 5 ]\ndo\n   echo $count\n   count=$((count+1))\ndone",
      "#!/bin/bash\ncount=1\nwhile [ count <= 5 ]\ndo\n   echo $count\n   count=count+1\ndone",
      "#!/bin/bash\ncount=1\nwhile ($count -le 5)\n{\n   echo $count\n   $count++\n}",
      "#!/bin/bash\ncount=1\nuntil [ $count -le 5 ]\ndo\n   echo $count\ndone",
    ],
  },
  {
    q: "What does checking the special variable parameter echo $? immediately after running a command tell an administrator?",
    options: [
      "The process ID (PID) of the command that just completed.",
      "The exit status code of the last executed command (0 for success).",
      "The total system execution time of the previous script line.",
      "The name of the user who triggered the current command string.",
    ],
  },
  {
    q: 'You run a script named setup.sh using ./setup.sh but receive a "Permission denied" error. You check the file properties and find it lacks execution permissions. What command resolves this?',
    options: [
      "chown +x setup.sh",
      "chmod +x setup.sh",
      "run ./setup.sh --force",
      "sed +x setup.sh",
    ],
  },
];

export const MARKS_PER_QUESTION = 1;
export const TOTAL_MARKS = QUESTIONS.length * MARKS_PER_QUESTION;
export const OPTION_LABELS = ["A", "B", "C", "D"];

/* obfuscated answer payload — not human-readable in sources */
export const ANSWER_PAYLOAD =
  "W2Nqbnd8hIqTmKKmrLS9wMjT2d3k7PX7AggRFh8kLTI7QEhOV1xlaXN4gYaMlJ2iqLC5vcfM1Nnj6fD2/wcMExghKi40PEZKUFhhZ2x1fYI=";
