export const REVISION_TOPICS = [
  {
    id: "files",
    title: "1. File Viewing",
    emoji: "📄",
    memory: "HEAD = top of file · TAIL = end of file · LESS = page by page · CAT = dump all",
    items: [
      {
        cmd: "head -15 app.log",
        meaning: "First 15 lines (startup params, headers).",
      },
      {
        cmd: "head -n 15 app.log",
        meaning: "Same as above — -n is the explicit form.",
      },
      {
        cmd: "tail -f nginx.log",
        meaning: "Live stream new log lines (502 debugging).",
      },
      {
        cmd: "less big.log",
        meaning: "Open huge files without loading all into RAM. Quit with q.",
      },
      {
        cmd: "cat file.txt",
        meaning: "Print whole file (fine for small files only).",
      },
    ],
  },
  {
    id: "text",
    title: "2. Text Processing (grep / sed / awk)",
    emoji: "🔍",
    memory: "grep = FIND text · sed = EDIT text · awk = COLUMNS",
    items: [
      {
        cmd: 'grep -n -i "CRITICAL" app.log',
        meaning: "-i ignore case, -n show line numbers.",
      },
      {
        cmd: 'grep -r "DB_PASSWORD" /var/www/html/',
        meaning: "Recursive search inside a folder tree.",
      },
      {
        cmd: `sed -i 's/OLD/NEW/g' file.conf`,
        meaning: "-i = edit file in-place (not just print).",
      },
      {
        cmd: "sed -n '50,75p' data.txt",
        meaning: "Print only lines 50–75 (-n silences auto-print).",
      },
      {
        cmd: "awk -F',' '{print $3}' metrics.csv",
        meaning: "-F sets separator; $3 is column 3.",
      },
    ],
  },
  {
    id: "find",
    title: "3. Finding Files",
    emoji: "🧭",
    memory: "find PATH -name NAME · hide errors with 2>/dev/null",
    items: [
      {
        cmd: 'find /var -name "backup.tar.gz"',
        meaning: "Recursive search by filename.",
      },
      {
        cmd: 'find / -name "secret.txt" 2>/dev/null',
        meaning: "Hide Permission denied noise (stderr → null).",
      },
      {
        cmd: "find . -type d",
        meaning: "Directories only (-type f = files).",
      },
    ],
  },
  {
    id: "perms",
    title: "4. Permissions & Ownership",
    emoji: "🔐",
    memory: "r=4 w=2 x=1 · Owner Group Others · chown user:group",
    items: [
      {
        cmd: "chmod 744 deploy.sh",
        meaning: "Owner rwx (7), group r-- (4), others r-- (4).",
      },
      {
        cmd: "chmod 640 secret.txt",
        meaning: "Owner rw (6), group r (4), others none (0).",
      },
      {
        cmd: "chmod 755 script.sh",
        meaning: "Owner rwx, group/others rx — classic scripts.",
      },
      {
        cmd: "chmod +x setup.sh",
        meaning: "Add execute bit (fixes Permission denied on ./script).",
      },
      {
        cmd: "chown rahul:devs /opt/app",
        meaning: "Set owner AND group in one command.",
      },
      {
        cmd: "chgrp devs file",
        meaning: "Change group only.",
      },
    ],
  },
  {
    id: "users",
    title: "5. Users, Groups & Privilege",
    emoji: "👤",
    memory: "useradd + passwd · sudo = one command as root · su = switch user",
    items: [
      {
        cmd: "useradd devops_user",
        meaning: "Create account (then set password).",
      },
      {
        cmd: "passwd devops_user",
        meaning: "Set / change login password.",
      },
      {
        cmd: "groupadd team",
        meaning: "Create a new group.",
      },
      {
        cmd: "sudo apt install nginx",
        meaning: "Run one command with admin rights.",
      },
      {
        cmd: "su - username",
        meaning: "Switch to another user shell.",
      },
      {
        cmd: "whoami / id",
        meaning: "Current user · full UID/GID/groups.",
      },
    ],
  },
  {
    id: "packages",
    title: "6. Packages (Debian / Ubuntu)",
    emoji: "📦",
    memory: "update = refresh list · upgrade = install newer versions",
    items: [
      {
        cmd: "apt update && apt upgrade",
        meaning: "Refresh package index, then upgrade installed packages.",
      },
      {
        cmd: "apt install nginx",
        meaning: "Install a package.",
      },
      {
        cmd: "yum / dnf / rpm",
        meaning: "RedHat / CentOS family package tools.",
      },
    ],
  },
  {
    id: "process",
    title: "7. Processes & Services",
    emoji: "⚙️",
    memory: "top = live view · kill -9 = force die · systemctl = service control",
    items: [
      {
        cmd: "top",
        meaning: "Interactive live process monitor.",
      },
      {
        cmd: "kill -9 8521",
        meaning: "SIGKILL — instant force kill (no cleanup).",
      },
      {
        cmd: "kill 8521",
        meaning: "Polite terminate (SIGTERM) — process may ignore.",
      },
      {
        cmd: "systemctl status nginx",
        meaning: "Is service active / failed / stopped?",
      },
      {
        cmd: "systemctl start|stop|restart|enable nginx",
        meaning: "Control and auto-start services.",
      },
    ],
  },
  {
    id: "network",
    title: "8. Networking",
    emoji: "🌐",
    memory: "ping = alive? · ip a = my IPs · ssh = remote login · scp = copy files",
    items: [
      {
        cmd: "ping 10.0.0.5",
        meaning: "Check reachability + latency (ICMP).",
      },
      {
        cmd: "ip a",
        meaning: "Show interface IP addresses (modern Linux).",
      },
      {
        cmd: "ssh user@host",
        meaning: "Secure remote shell.",
      },
      {
        cmd: "scp file user@host:/path",
        meaning: "Secure copy over SSH.",
      },
    ],
  },
  {
    id: "disk",
    title: "9. Disk & Memory",
    emoji: "💾",
    memory: "df = disk free (filesystems) · du = disk usage (folder) · free = RAM",
    items: [
      {
        cmd: "df -h",
        meaning: "All mounts, free/used space, human-readable.",
      },
      {
        cmd: "du -sh /var/log/nginx/",
        meaning: "Total size of one directory only.",
      },
      {
        cmd: "free -m",
        meaning: "RAM + swap in megabytes.",
      },
    ],
  },
  {
    id: "archive",
    title: "10. Archives & Shutdown",
    emoji: "🗜️",
    memory: "tar -czvf = create gzip · tar -xvf = extract · shutdown -h +10",
    items: [
      {
        cmd: "tar -czvf backup.tar.gz /home/ubuntu/data",
        meaning: "c=create, z=gzip, v=verbose, f=file.",
      },
      {
        cmd: "tar -xvf archive.tar",
        meaning: "Extract archive contents.",
      },
      {
        cmd: "tar -cvf archive.tar folder/",
        meaning: "Create uncompressed tar.",
      },
      {
        cmd: "shutdown -h +10",
        meaning: "Halt system in 10 minutes.",
      },
    ],
  },
  {
    id: "bash",
    title: "11. Bash Scripting Essentials",
    emoji: "🧠",
    memory: "$1 = first arg · $? = exit code · -gt/-ge/-le · always use $var inside [ ]",
    items: [
      {
        cmd: "#!/bin/bash",
        meaning: "Shebang — which interpreter runs the script.",
      },
      {
        cmd: "read name",
        meaning: "Take user input into a variable.",
      },
      {
        cmd: 'if [ $num -gt 10 ]; then ...; fi',
        meaning: "Need $ before variable; spaces inside [ ].",
      },
      {
        cmd: "if [ $age -ge 18 ]; then ...; else ...; fi",
        meaning: "-ge = greater or equal; always close with fi.",
      },
      {
        cmd: "while [ $count -le 5 ]; do ...; count=$((count+1)); done",
        meaning: "Loop while condition true; $(( )) for math.",
      },
      {
        cmd: "echo $1",
        meaning: "First CLI argument (./script.sh /opt/data → $1=/opt/data).",
      },
      {
        cmd: "echo $?",
        meaning: "Exit status of last command (0 = success).",
      },
      {
        cmd: "chmod +x setup.sh && ./setup.sh",
        meaning: "Script needs execute permission to run.",
      },
    ],
  },
  {
    id: "cheats",
    title: "12. 60-Second Cheat Codes",
    emoji: "⚡",
    memory: "Say these out loud once — they stick.",
    items: [
      {
        cmd: "head / tail -f / less",
        meaning: "Start · Live end · Big file pager",
      },
      {
        cmd: "grep -rin / sed -i / awk -F",
        meaning: "Search · Edit in-place · Columns",
      },
      {
        cmd: "find PATH -name FILE 2>/dev/null",
        meaning: "Find file, silence permission errors",
      },
      {
        cmd: "rwx = 4+2+1 = 7",
        meaning: "Permission math forever",
      },
      {
        cmd: "df -h · du -sh · free -m",
        meaning: "Disk free · Folder size · RAM",
      },
      {
        cmd: "systemctl status · kill -9 · sudo",
        meaning: "Service health · Force kill · Admin power",
      },
      {
        cmd: "$1 · $? · -gt -ge -le",
        meaning: "Arg · Exit code · Number compares",
      },
    ],
  },
];
