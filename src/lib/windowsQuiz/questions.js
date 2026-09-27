export const QUESTIONS = [
  {
    "q": "Which Windows Server installation option lacks a standard graphical user interface (GUI) and provides a reduced attack surface with lower servicing requirements?",
    "options": [
      "Server with Desktop Experience",
      "Server Core",
      "Nano Server",
      "Windows Workstation Mode"
    ]
  },
  {
    "q": "What is the key functional difference between a Server Role and a Server Feature in Windows Server?",
    "options": [
      "Roles require separate paid licenses; Features are free utilities.",
      "Roles define the primary workload and purpose of the server; Features are auxiliary capabilities supporting or augmenting system functionality.",
      "Features can only be installed on domain controllers, while Roles can run anywhere.",
      "Roles are configured exclusively via Command Prompt; Features are managed via GUI."
    ]
  },
  {
    "q": "Which default network port is utilized by the Remote Desktop Protocol (RDP) for administrative connections?",
    "options": [
      "TCP 445",
      "TCP 389",
      "TCP 3389",
      "TCP 88"
    ]
  },
  {
    "q": "Which disk partitioning scheme must be chosen to support boot volumes larger than 2 TB and native UEFI firmware?",
    "options": [
      "MBR (Master Boot Record)",
      "GPT (GUID Partition Table)",
      "Dynamic FAT32",
      "Basic Extended Partitioning"
    ]
  },
  {
    "q": "Which PowerShell cmdlet attaches and mounts an existing Virtual Hard Disk (.vhd or .vhdx) into the host operating system?",
    "options": [
      "Mount-DiskImage",
      "Attach-VirtualDisk",
      "New-VHDVolume",
      "Import-DiskDriver"
    ]
  },
  {
    "q": "What is the primary architectural advantage of the VHDX virtual hard disk format over the legacy VHD format?",
    "options": [
      "VHDX supports up to 64 TB storage capacity and provides resiliency against file corruption caused by power failures.",
      "VHDX files can be read directly by MS-DOS boot disks.",
      "VHDX bypasses the host storage driver completely.",
      "VHDX is limited to fixed disk allocations only."
    ]
  },
  {
    "q": "What is the technical distinction between 'Free Space' and 'Unallocated Space' in Windows Disk Management?",
    "options": [
      "Free space exists only in the cloud; unallocated space is on-premises.",
      "Free space represents unused capacity inside an existing filesystem partition; unallocated space represents physical disk blocks not yet assigned to any partition.",
      "Unallocated space has been encrypted with BitLocker; free space cannot be encrypted.",
      "They are completely interchangeable terms in Windows storage."
    ]
  },
  {
    "q": "A user possesses 'Read' Share permissions on a shared network folder, but their NTFS permissions on the target directory are set to 'Full Control'. What is their effective access across the network?",
    "options": [
      "Full Control",
      "Modify",
      "Read",
      "Access Denied"
    ]
  },
  {
    "q": "What happens to the NTFS permissions of a file when it is MOVED from D:\\Data\\Docs to D:\\Archive on the SAME NTFS volume?",
    "options": [
      "The file inherits permissions from D:\\Archive.",
      "The file loses all permissions and becomes accessible only to SYSTEM.",
      "The file retains its original NTFS permissions.",
      "The file prompts the administrator to manually define a new security descriptor."
    ]
  },
  {
    "q": "Which explicit permission entry takes absolute precedence over all others during Windows Security Descriptor evaluation?",
    "options": [
      "Explicit Deny",
      "Explicit Allow",
      "Inherited Deny",
      "Inherited Allow"
    ]
  },
  {
    "q": "Which port does modern Server Message Block (SMB Direct / SMB over TCP) utilize for Windows File Sharing?",
    "options": [
      "TCP 135",
      "TCP 139",
      "TCP 445",
      "UDP 53"
    ]
  },
  {
    "q": "Which syntax represents a valid Universal Naming Convention (UNC) path to access a shared resource?",
    "options": [
      "http://Server01/SharedDocs",
      "\\\\Server01\\SharedDocs",
      "C:\\Server01\\SharedDocs",
      "//Server01/SharedDocs$"
    ]
  },
  {
    "q": "What role service provides a unified, logical tree view of shared folders hosted across multiple disparate file servers?",
    "options": [
      "Distributed File System (DFS) Namespaces",
      "iSCSI Target Server",
      "Storage Spaces Direct (S2D)",
      "BranchCache"
    ]
  },
  {
    "q": "What protocol allows a Windows Server to mount remote block-level raw storage over standard TCP/IP Ethernet networks without dedicated Fiber Channel hardware?",
    "options": [
      "SMB 3.0",
      "iSCSI",
      "NFS",
      "NVMe-oF over RoCE only"
    ]
  },
  {
    "q": "What component is required in a Windows Server Failover Cluster (WSFC) with an even number of nodes to maintain quorum during a split-brain scenario?",
    "options": [
      "Secondary Domain Controller",
      "Witness (Disk Witness, File Share Witness, or Cloud Witness)",
      "WSUS Replica Server",
      "Read-Only Domain Controller"
    ]
  },
  {
    "q": "Which native Windows management console automatically launches at administrator logon to aggregate role installation, feature configuration, and multi-server dashboard metrics?",
    "options": [
      "Computer Management (compmgmt.msc)",
      "Server Manager (ServerManager.exe)",
      "Control Panel",
      "Windows Admin Center Gateway"
    ]
  },
  {
    "q": "What is the maximum single volume size and primary structural limitation of the legacy FAT32 file system when compared to NTFS?",
    "options": [
      "16 TB maximum volume size, cannot store hidden files",
      "2 TB maximum volume size, 4 GB maximum single file size, and complete absence of native security permissions (ACLs)",
      "64 TB volume size, cannot format removable flash drives",
      "256 TB volume size, requires dynamic disks"
    ]
  },
  {
    "q": "Which advanced enterprise file system introduced by Microsoft provides native integrity streams, copy-on-write data validation, and real-time repair of silent data corruption without running offline chkdsk?",
    "options": [
      "exFAT",
      "NTFS",
      "ReFS (Resilient File System)",
      "HPFS"
    ]
  },
  {
    "q": "Which standard Windows feature or capability is natively unsupported on an ReFS formatted data volume?",
    "options": [
      "BitLocker Drive Encryption",
      "Storage Spaces Direct (S2D)",
      "NTFS File System Compression, Encrypting File System (EFS), and Disk Quotas",
      "File sizes exceeding 1 TB"
    ]
  },
  {
    "q": "What is the architectural relationship and correct hierarchical sequence between a Physical Disk, a Partition, a Volume, and a File System in Windows storage?",
    "options": [
      "File System -> Volume -> Partition -> Physical Disk",
      "Physical Disk -> Partition -> Volume -> File System formatted on the volume",
      "Volume -> Physical Disk -> File System -> Partition",
      "Partition -> Physical Disk -> Volume -> File System"
    ]
  },
  {
    "q": "Which drive letters are permanently reserved by the Windows operating system for legacy floppy disk drives and are skipped by default when auto-assigning drive letters to new volumes?",
    "options": [
      "Letters X: and Y:",
      "Letters A: and B:",
      "Letters C: and D:",
      "Letters M: and N:"
    ]
  },
  {
    "q": "When mounting an ISO disk image file directly in Windows Server via File Explorer or PowerShell, what virtual hardware mechanism exposes the contents?",
    "options": [
      "Hyper-V Virtual Switch adapter",
      "Virtual CD/DVD-ROM drive loopback mechanism",
      "iSCSI Software Target",
      "Remote Desktop Virtual Channel"
    ]
  },
  {
    "q": "In an iSCSI storage implementation, what is the technical name of the client software or hardware initiator that discovers and mounts block storage targets?",
    "options": [
      "iSCSI Target Server",
      "iSCSI Initiator",
      "iSCSI Broker",
      "iSCSI LUN Provider"
    ]
  },
  {
    "q": "What standard network port does an iSCSI Initiator use by default to establish sessions and send SCSI block commands to an iSCSI Target?",
    "options": [
      "TCP 445",
      "TCP 3260",
      "TCP 3389",
      "TCP 88"
    ]
  },
  {
    "q": "What happens to child objects when an administrator clicks 'Disable inheritance' on a parent directory's NTFS Security properties?",
    "options": [
      "The folder and all underlying files are immediately deleted.",
      "Windows prompts the administrator to either convert existing inherited permissions into explicit permissions or remove all inherited permissions completely.",
      "The folder is automatically locked and encrypted using BitLocker.",
      "All standard users are granted Full Control automatically."
    ]
  },
  {
    "q": "What is the primary database file name and default storage location for Active Directory Domain Services (AD DS)?",
    "options": [
      "ActiveDirectory.mdf inside C:\\Program Files\\AD",
      "ntds.dit inside C:\\Windows\\NTDS",
      "sam.dat inside C:\\Windows\\System32\\Config",
      "ad_schema.edb inside C:\\Windows\\SYSVOL"
    ]
  },
  {
    "q": "Which shared folder replicated across all Domain Controllers stores Group Policy templates, login scripts, and system policies?",
    "options": [
      "NETLOGON",
      "SYSVOL",
      "CertEnroll",
      "ADMIN$"
    ]
  },
  {
    "q": "Which Active Directory group scope can contain members from any domain in the forest, but can only be granted permissions to resources in its OWN domain?",
    "options": [
      "Domain Local Group",
      "Global Group",
      "Universal Group",
      "Distribution Group"
    ]
  },
  {
    "q": "What is the ultimate administrative and security boundary in Active Directory?",
    "options": [
      "Organizational Unit (OU)",
      "Domain",
      "Forest",
      "Site"
    ]
  },
  {
    "q": "Which protocol does Active Directory primarily use to query and modify directory objects over port 389 and port 636?",
    "options": [
      "Kerberos",
      "LDAP",
      "RPC",
      "SMB"
    ]
  },
  {
    "q": "Which DNS record type is critical for domain-joined clients to locate Domain Controllers, Kerberos KDCs, and LDAP services?",
    "options": [
      "A records",
      "SRV records",
      "PTR records",
      "CNAME records"
    ]
  },
  {
    "q": "What Active Directory component represents physical network topology and IP subnets to optimize client logon and replication traffic?",
    "options": [
      "Active Directory Domains",
      "Organizational Units",
      "Active Directory Sites",
      "Trust Relationships"
    ]
  },
  {
    "q": "What authentication mechanism is used natively by Windows Active Directory clients when communicating with services via SPN (Service Principal Name)?",
    "options": [
      "NTLMv2",
      "Kerberos v5",
      "PAP",
      "Digest Authentication"
    ]
  },
  {
    "q": "What is the functional difference between an Organizational Unit (OU) and a Container (like CN=Users) in Active Directory?",
    "options": [
      "OUs cannot contain computer objects.",
      "Containers can have Group Policy Objects (GPOs) linked directly to them, whereas OUs cannot.",
      "GPOs can be linked directly to OUs, but GPOs CANNOT be linked directly to default containers like CN=Users or CN=Computers.",
      "Containers support delegation of administration, but OUs do not."
    ]
  },
  {
    "q": "What replication engine is used by modern Windows Server Domain Controllers to synchronize the contents of the SYSVOL directory?",
    "options": [
      "FRS (File Replication Service)",
      "DFS-R (Distributed File System Replication)",
      "BITS",
      "Robocopy Daemon"
    ]
  },
  {
    "q": "In an Active Directory forest with multiple Domain Controllers, which Flexible Single Master Operation (FSMO) role is responsible for synchronizing time across the domain?",
    "options": [
      "Schema Master",
      "PDC Emulator (in the Forest Root Domain)",
      "Infrastructure Master",
      "RID Master"
    ]
  },
  {
    "q": "Which FSMO role must be available when an administrator attempts to create a new user or computer object to allocate security identifiers?",
    "options": [
      "RID Master",
      "Schema Master",
      "Domain Naming Master",
      "PDC Emulator"
    ]
  },
  {
    "q": "Which global directory service facilitates cross-domain object search within an Active Directory forest by hosting a partial attribute set of all objects?",
    "options": [
      "Global Catalog (GC)",
      "Read-Only Domain Controller (RODC)",
      "Key Distribution Center (KDC)",
      "Certificate Authority (CA)"
    ]
  },
  {
    "q": "What feature introduced in Windows Server 2008 R2 allows recovering deleted user and computer objects with full attributes and SIDs without offline directory restoration?",
    "options": [
      "Active Directory Recycle Bin",
      "Authoritative Restore via ntdsutil",
      "Shadow Copies",
      "System Restore Point"
    ]
  },
  {
    "q": "Which specialized domain controller type holds a read-only copy of ntds.dit and utilizes a Password Replication Policy (PRP) for branch office security?",
    "options": [
      "Read-Only Domain Controller (RODC)",
      "Workgroup Bridge Server",
      "Schema Cache Controller",
      "Global Catalog Replica Only"
    ]
  },
  {
    "q": "What is the default order of Group Policy application from first to last (lowest to highest precedence)?",
    "options": [
      "Domain -> OU -> Site -> Local",
      "Local -> Site -> Domain -> OU (LSDOU)",
      "OU -> Domain -> Site -> Local",
      "Site -> Local -> Domain -> OU"
    ]
  },
  {
    "q": "If an administrator links three separate GPOs to a single OU, which GPO has the highest precedence among them?",
    "options": [
      "Link Order 1",
      "Link Order 3",
      "The GPO created first",
      "The largest GPO by file size"
    ]
  },
  {
    "q": "What setting on a parent GPO link forces its settings to override lower-level policies, ignoring any 'Block Inheritance' configured on child OUs?",
    "options": [
      "Loopback Processing",
      "Enforced (formerly No Override)",
      "Security Filtering",
      "WMI Filtering"
    ]
  },
  {
    "q": "How does Group Policy 'Security Filtering' determine whether a GPO applies to a specific user or computer?",
    "options": [
      "By verifying IP address subnets in the GPO header.",
      "By granting both 'Read' and 'Apply Group Policy' permissions to the targeted security principal in the GPO's DACL.",
      "By disabling User Account Control (UAC) on target workstations.",
      "By checking if the user is a local administrator."
    ]
  },
  {
    "q": "What is the key difference between Group Policy 'Settings' (Administrative Templates) and Group Policy 'Preferences'?",
    "options": [
      "Preferences enforce strict mandatory policies; Settings are optional hints.",
      "Policies (Settings) create policy registry keys that tattoo the registry; Preferences do not write to the registry.",
      "Policies strictly enforce settings (preventing user modification); Preferences set a default baseline that the user can subsequently modify.",
      "Preferences only work when disconnected from the domain."
    ]
  },
  {
    "q": "Which command-line utility forces an immediate refresh of both Computer and User Group Policies on a local Windows client?",
    "options": [
      "gpupdate /force",
      "gpresult /refresh",
      "net gpo update",
      "dsa.msc /sync"
    ]
  },
  {
    "q": "Which command produces a detailed command-line summary showing applied and denied GPOs for the currently logged-in user and computer?",
    "options": [
      "gpresult /r",
      "gplist -all",
      "dsquery gpo",
      "whoami /gpo"
    ]
  },
  {
    "q": "Where in Group Policy can an administrator define domain-wide Account Lockout and Password History requirements?",
    "options": [
      "Default Domain Policy linked at the root of the Domain",
      "Local Computer Policy on every individual machine",
      "Default Domain Controllers Policy linked to the Domain Controllers OU",
      "Any GPO linked to an individual user's OU"
    ]
  },
  {
    "q": "When a terminal server or kiosk requires User settings to be determined by the host computer rather than the user's OU, what GPO mode must be enabled?",
    "options": [
      "Security Filtering",
      "Loopback Processing Mode (Replace or Merge)",
      "Block Inheritance",
      "Item-Level Targeting"
    ]
  },
  {
    "q": "Which tool or feature in Group Policy Preferences allows targeting a printer or drive mapping based on RAM, IP range, battery status, or security group membership?",
    "options": [
      "WMI Filters",
      "Item-Level Targeting (ILT)",
      "Security Filtering",
      "Access-Based Enumeration"
    ]
  },
  {
    "q": "What command generates a full HTML report of a client machine's applied Group Policies and exports it to a readable file?",
    "options": [
      "gpresult /h C:\\Reports\\gpreport.html",
      "gpupdate /export:html C:\\Reports\\gpreport.html",
      "gpmc.msc /generate-html C:\\Reports\\gpreport.html",
      "dsquery gpo -html > C:\\Reports\\gpreport.html"
    ]
  },
  {
    "q": "What is the default background Group Policy refresh interval for domain-joined Windows computers?",
    "options": [
      "Every 15 minutes with no offset",
      "Every 90 minutes with a random 0 to 30 minute offset",
      "Every 24 hours at midnight",
      "Only upon user logoff or machine reboot"
    ]
  },
  {
    "q": "Which file located inside each GPO's folder in SYSVOL stores the policy version number compared against Active Directory?",
    "options": [
      "Registry.pol",
      "gpt.ini",
      "PolicyHost.xml",
      "SecEdit.sdb"
    ]
  },
  {
    "q": "Why does setting a GPO Preference drive mapping to 'Replace' cause user frustration during business hours?",
    "options": [
      "It deletes all files in the mapped share.",
      "It unmaps and immediately remaps the drive during background refresh, causing file locks and active session disconnects.",
      "It locks the network adapter for 30 seconds.",
      "It reboots the client workstation."
    ]
  },
  {
    "q": "What Group Policy setting restricts application execution based on digital signatures, publisher certificates, or file hashes?",
    "options": [
      "AppLocker / Windows Defender Application Control (WDAC)",
      "BitLocker Drive Encryption",
      "File Screening Management",
      "Dynamic Access Control"
    ]
  },
  {
    "q": "Which Windows Registry hive contains hardware profiles, driver definitions, security databases (SAM), and software configurations common to the entire system?",
    "options": [
      "HKEY_CURRENT_USER (HKCU)",
      "HKEY_LOCAL_MACHINE (HKLM)",
      "HKEY_CLASSES_ROOT (HKCR)",
      "HKEY_USERS (HKU)"
    ]
  },
  {
    "q": "Where does the data displayed in the HKEY_CURRENT_USER (HKCU) registry hive physically reside on disk?",
    "options": [
      "C:\\Windows\\System32\\config\\SOFTWARE",
      "C:\\Users\\<Username>\\NTUSER.DAT",
      "C:\\Windows\\System32\\config\\SYSTEM",
      "C:\\Users\\<Username>\\AppData\\Local\\registry.bin"
    ]
  },
  {
    "q": "What is the standard data type used in the Windows Registry to represent a 32-bit integer or a binary True/False (1 or 0) switch?",
    "options": [
      "REG_SZ",
      "REG_DWORD",
      "REG_QWORD",
      "REG_MULTI_SZ"
    ]
  },
  {
    "q": "What registry data type represents an expandable text string containing unexpanded environment variables (such as %SystemRoot%)?",
    "options": [
      "REG_SZ",
      "REG_EXPAND_SZ",
      "REG_BINARY",
      "REG_MULTI_SZ"
    ]
  },
  {
    "q": "Which registry hive is a dynamic view formed by merging HKLM\\Software\\Classes and HKCU\\Software\\Classes to manage file extensions and COM registrations?",
    "options": [
      "HKEY_CURRENT_CONFIG",
      "HKEY_CLASSES_ROOT (HKCR)",
      "HKEY_PERF_DATA",
      "HKEY_USERS"
    ]
  },
  {
    "q": "Under which specific registry subkey do standard Group Policy Administrative Templates write policy configurations that lock the user interface?",
    "options": [
      "HKLM\\System\\CurrentControlSet\\Services",
      "HKLM\\Software\\Policies and HKCU\\Software\\Policies",
      "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      "HKLM\\System\\Setup"
    ]
  },
  {
    "q": "What is the consequence of configuring a registry setting using a direct manual script versus deploying it via a formal Group Policy Administrative Template?",
    "options": [
      "Manual registry scripts require a system reinstall to take effect.",
      "Administrative Templates automatically revert policies when the GPO falls out of scope, whereas direct registry modifications 'tattoo' the registry until manually removed.",
      "Group Policy cannot write to the registry under any circumstance.",
      "Manual registry entries are erased upon client reboot."
    ]
  },
  {
    "q": "Which command-line tool allows administrators to query, add, delete, and import registry keys and values from batch scripts?",
    "options": [
      "reg.exe",
      "regedit.exe /gui",
      "diskpart.exe",
      "sc.exe"
    ]
  },
  {
    "q": "Which Windows Registry hive is rebuilt dynamically during operating system boot and never stored directly as a file on disk?",
    "options": [
      "HKEY_CURRENT_CONFIG (HKCC)",
      "HKEY_LOCAL_MACHINE\\SAM",
      "HKEY_LOCAL_MACHINE\\SECURITY",
      "HKEY_LOCAL_MACHINE\\SOFTWARE"
    ]
  },
  {
    "q": "Which built-in PowerShell drives (PSDrive) allow querying and updating registry keys using filesystem cmdlets like Get-ChildItem and Set-ItemProperty?",
    "options": [
      "HKLM: and HKCU:",
      "REG: and HIVE:",
      "SYS: and USR:",
      "C:\\Registry"
    ]
  },
  {
    "q": "Which registry subkey is checked to audit software configured to execute automatically when any user logs into Windows?",
    "options": [
      "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
      "HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer",
      "HKCU\\Software\\Policies",
      "HKLM\\SAM\\SAM\\Domains"
    ]
  },
  {
    "q": "What is the structural difference between an .admx file and an .adml file?",
    "options": [
      ".admx contains security hashes; .adml contains firewall rules.",
      ".admx defines core policy logic and registry mappings in XML; .adml contains language-specific display strings.",
      ".admx is used only on Windows 7; .adml is used on Windows Server 2022.",
      ".admx is a binary executable; .adml is a text script."
    ]
  },
  {
    "q": "To establish a centralized repository for Group Policy templates (Central Store), in which exact path within the domain must the PolicyDefinitions folder be created?",
    "options": [
      "\\\\<domain>\\NETLOGON\\PolicyDefinitions",
      "\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions",
      "C:\\Windows\\System32\\GroupPolicy\\PolicyDefinitions",
      "\\\\<domain>\\ADMIN$\\PolicyDefinitions"
    ]
  },
  {
    "q": "How does the Group Policy Management Editor indicate that an administrative template is being read from the Central Store rather than the local machine?",
    "options": [
      "It displays the message: 'Administrative Templates: Policy definitions (ADMX files) retrieved from the central store.'",
      "The console changes color from blue to green.",
      "It disables the Computer Configuration branch completely.",
      "It demands a domain administrator password prompt whenever opened."
    ]
  },
  {
    "q": "Where must language-specific .adml files be placed inside the Central Store for US-English administrators?",
    "options": [
      "\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions\\en-US",
      "\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions\\Languages",
      "\\\\<domain>\\SYSVOL\\<domain>\\Policies\\en-US\\PolicyDefinitions",
      "\\\\<domain>\\SYSVOL\\<domain>\\Policies\\PolicyDefinitions"
    ]
  },
  {
    "q": "What error typically occurs in the Group Policy Management Editor when an .admx file is placed in PolicyDefinitions without its corresponding .adml file in the language folder?",
    "options": [
      "The server experiences a Blue Screen (BSOD).",
      "An error dialog reports that the corresponding resource file could not be found (e.g., 'Resource $(string.xyz) referenced could not be found').",
      "The entire SYSVOL volume is marked offline.",
      "The GPO converts silently into a PowerShell script."
    ]
  },
  {
    "q": "Why did Microsoft replace legacy .adm files with the XML-based .admx/.adml architecture starting in Windows Vista/Server 2008?",
    "options": [
      "Legacy .adm files were limited to 128 characters total.",
      "Legacy .adm files were copied into EVERY individual GPO folder in SYSVOL, causing massive storage bloat ('SYSVOL bloat'); ADMX files are read from a single central location.",
      ".adm files could not support 64-bit operating systems.",
      ".adm files required active IIS web servers on every domain controller."
    ]
  },
  {
    "q": "When opening GPMC, an error dialog displays: \"Namespace 'Microsoft.Policies.Windows' is already defined as the target namespace for another file in the store.\" What caused this error?",
    "options": [
      "Two different ADMX files declare the exact same XML namespace identifier.",
      "The SYSVOL folder is full.",
      "Two domain controllers are running different versions of PowerShell.",
      "The domain administrator account is locked out."
    ]
  },
  {
    "q": "A systems engineer wants to create a custom ADMX policy template to manage an internal company application via GPO. Which tag inside an ADMX file maps the policy setting to a specific registry location?",
    "options": [
      "<targetRegistry key='...' valueName='...'>",
      "<registry-link path='...' />",
      "<policy ... key='Software\\Policies\\CompanyApp' valueName='AppEnabled'>",
      "<regKey HKLM='True' />"
    ]
  },
  {
    "q": "In an ADMX file, which XML element defines a drop-down list of choices for administrators in the GPMC user interface?",
    "options": [
      "<enum>",
      "<dropdownList>",
      "<select>",
      "<multiOption>"
    ]
  },
  {
    "q": "A new storage volume of 4 TB was partitioned using MBR. In Disk Management, only 2 TB is usable, and the remaining 2 TB cannot be allocated. How do you resolve this?",
    "options": [
      "Format the drive with exFAT instead of NTFS.",
      "Back up data, delete the volume, convert the disk to GPT, and create a new volume.",
      "Run the command chkdsk /f on the volume.",
      "Upgrade the server power supply to supply extra disk current."
    ]
  },
  {
    "q": "You are preparing an automated disaster recovery script to back up an Amazon EBS-backed Windows Server. You need to create an identical read-only snapshot volume locally. Which PowerShell command unmounts an active VHDX before backup?",
    "options": [
      "Dismount-DiskImage -ImagePath 'D:\\VMs\\Disk1.vhdx'",
      "Remove-Item -Path 'D:\\VMs\\Disk1.vhdx' -Force",
      "Stop-VirtualDisk -Name 'Disk1'",
      "Disconnect-SMBShare -Path 'D:\\VMs\\Disk1.vhdx'"
    ]
  },
  {
    "q": "A remote office file server running Windows Server 2022 cannot be accessed by branch workstations via \\\\192.168.10.50\\Finance. A network trace shows SYN packets reaching the server on TCP port 445, but no responses. What is the most likely culprit?",
    "options": [
      "DNS reverse lookup failure on the client workstation.",
      "Windows Defender Firewall on the file server is blocking File and Printer Sharing (SMB-In).",
      "The workstation lacks a Kerberos ticket granting ticket (TGT).",
      "The hard drive has been formatted with ReFS instead of NTFS."
    ]
  },
  {
    "q": "An administrator needs to create a hidden administrative file share named 'Confidential' so that it does not appear when users browse network shares. How should the share be named?",
    "options": [
      "Confidential#",
      ".Confidential",
      "Confidential$",
      "__Confidential"
    ]
  },
  {
    "q": "A junior admin changes a folder's share permissions to 'Everyone: Read'. However, domain users in the 'Finance-Dept' group report they can still create, modify, and delete files over the network. Why?",
    "options": [
      "The users are accessing the share using PowerShell instead of Windows Explorer.",
      "The premise is impossible; Share permissions always restrict network access regardless of NTFS.",
      "The folder has alternate data streams that bypass SMB security.",
      "Share permissions are evaluated against NTFS, but the users might be connected through a different share path pointing to the same folder with 'Full Control' share permissions."
    ]
  },
  {
    "q": "A security analyst discovers that unprivileged domain users can take ownership of sensitive folders on a file server. Which User Right Assignment in GPO must be audited and restricted?",
    "options": [
      "Access this computer from the network",
      "Take ownership of files or other objects (SeTakeOwnershipPrivilege)",
      "Bypass traverse checking",
      "Back up files and directories"
    ]
  },
  {
    "q": "A domain controller's hard drive experiences catastrophic storage failure. After replacing the drive, you must restore Active Directory from a system state backup. In which boot mode must AD DS be started?",
    "options": [
      "Safe Mode with Networking",
      "Directory Services Restore Mode (DSRM)",
      "Debugging Mode",
      "Windows Recovery Environment Command Prompt only"
    ]
  },
  {
    "q": "A workstation joins the domain corp.contoso.com. During the join operation, an error states 'An Active Directory Domain Controller for the domain could not be contacted.' The admin can ping the DC's IP. What is the most common cause?",
    "options": [
      "The workstation's primary DNS server is pointed to an external ISP or router rather than the AD Domain Controller's DNS server.",
      "The domain controller is out of memory.",
      "NetBIOS over TCP/IP is turned on.",
      "The workstation has an expired Windows license."
    ]
  },
  {
    "q": "An employee named Sarah in the Sales OU is terminated. The security team requests that her access be revoked immediately across all domain resources without deleting her account. What is the immediate best practice?",
    "options": [
      "Change her first name in Active Directory.",
      "Disable the user account and terminate active Kerberos/sessions.",
      "Move the account to the Computers container.",
      "Delete the NTUSER.DAT file from the DC."
    ]
  },
  {
    "q": "A user is a member of 1,200 security groups in Active Directory. When logging into a workstation, authentication fails with a token bloat error. What protocol header limit is being exceeded?",
    "options": [
      "DNS query buffer size",
      "Kerberos ticket maximum size (MaxTokenSize)",
      "LDAP search filter pagination limit",
      "SMB packet header timeout"
    ]
  },
  {
    "q": "You configured a new GPO setting to lock screens after 15 minutes of inactivity. On workstation WS-01, running gpresult /h report.html shows the GPO is applied, but the screen does not lock. What is the next logical troubleshooting step?",
    "options": [
      "Check whether another GPO with higher precedence or an Enforced link is overriding this specific setting in the report's component details.",
      "Reinstall the operating system on the client.",
      "Demote the primary domain controller.",
      "Restart the DNS Server service."
    ]
  },
  {
    "q": "An admin notices that when user 'Alex' logs into workstation 'LAB-PC-05', Alex's standard desktop background policy does NOT apply. You check the GPO and find 'Block Inheritance' is set on the 'Lab Computers' OU. Why did Alex's policy fail?",
    "options": [
      "User policies are never blocked by OU inheritance.",
      "The GPO was linked to Alex's User OU, but 'Loopback Processing Mode: Replace' is enabled on LAB-PC-05, replacing User settings with the computer's policies.",
      "The client network cable was unplugged during startup.",
      "Alex's account is a member of Domain Admins."
    ]
  },
  {
    "q": "A new GPO was linked to an OU, but clients in that OU have not received the update after 3 hours. You run gpupdate /force on a client and receive an error stating the GPO cannot be read from SYSVOL. What should you investigate first?",
    "options": [
      "DFS-R replication health between Domain Controllers and NTFS permissions on the GPO GUID folder in SYSVOL.",
      "Client RAM exhaustion.",
      "The BIOS version of the domain controller.",
      "Windows Subsystem for Linux installation."
    ]
  },
  {
    "q": "You need to delegate authority to helpdesk staff so they can reset domain user passwords without making them Domain Admins. What is the recommended least-privilege approach?",
    "options": [
      "Add them to the local Administrators group on the Domain Controllers.",
      "Use the 'Delegate Control' wizard in Active Directory Users and Computers on the targeted OU.",
      "Give them the password to the DSRM Administrator account.",
      "Make them members of the Schema Admins group."
    ]
  },
  {
    "q": "What happens when an administrator enables 'Access-Based Enumeration' (ABE) on a Windows SMB file share?",
    "options": [
      "Users only see files and folders for which they possess explicit read permissions; all other folders remain completely hidden.",
      "The share is permanently restricted to local administrators.",
      "Storage quotas are eliminated.",
      "The share converts from SMB to NFS protocol."
    ]
  }
];

export const MARKS_PER_QUESTION = 1;
export const TOTAL_MARKS = QUESTIONS.length * MARKS_PER_QUESTION;
export const OPTION_LABELS = ["A", "B", "C", "D"];

/* obfuscated answer payload — not human-readable in sources */
export const ANSWER_PAYLOAD = "W2BqbnZ9hYmQmaKmrrS9wsvT2t7n7PX6AwgRFxwkLTE7Q0lOVl1ka3N5gYaMlZyjq7C4vsfM1Nrj6PH2/wQMExohKS42PUVKUltgZm50foCLkJiep621u8PJ";
