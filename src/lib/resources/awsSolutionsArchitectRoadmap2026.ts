import type { ResourceSection } from '@/lib/resources/types';

export const AWS_SOLUTIONS_ARCHITECT_ROADMAP_2026_SECTIONS: ResourceSection[] = [
  {
    heading: 'Introduction',
    body: 'Amazon Web Services (AWS) powers a large share of the world\'s cloud infrastructure — from startups to Fortune 500 enterprises. The AWS Solutions Architect role sits at the center of this ecosystem: designing secure, scalable, and cost-effective systems that solve real business problems.\n\nThis 2026 roadmap is a structured learning path for IT professionals, developers, system administrators, and career switchers who want to build job-ready cloud architecture skills and prepare for the AWS Certified Solutions Architect – Associate (SAA-C03) exam.\n\nWhether you learn through self-study or a mentor-led program, follow the phases in order, complete hands-on labs after each topic, and document every project in your portfolio.',
  },
  {
    heading: 'Why Learn AWS in 2026?',
    body: 'Cloud adoption continues to accelerate as organizations modernize legacy systems, adopt AI workloads, and demand global scalability. AWS remains a market leader with the broadest service catalog and the most mature enterprise ecosystem.\n\nLearning AWS in 2026 positions you for roles that combine architecture, security, automation, and cost governance — skills that remain in high demand across India, the Middle East, North America, and remote-first companies worldwide.\n\nKey reasons professionals choose AWS in 2026:',
    bullets: [
      'Largest cloud job market with Solutions Architect, Cloud Engineer, and DevOps overlap',
      'SAA-C03 is one of the most recognized entry-level cloud certifications globally',
      'AWS skills transfer to multi-cloud and hybrid environments',
      'Strong free tier and documentation for hands-on practice',
      'Growing integration with AI/ML, data, and serverless workloads',
    ],
  },
  {
    heading: 'What Does an AWS Solutions Architect Do?',
    body: 'An AWS Solutions Architect designs cloud solutions that meet functional, security, reliability, performance, and cost requirements. They work with stakeholders to translate business needs into technical architectures — not just provision resources in the console.\n\nDay-to-day responsibilities often include:',
    bullets: [
      'Designing multi-tier applications with proper VPC, compute, and data layers',
      'Choosing the right AWS services (EC2 vs Lambda, RDS vs DynamoDB, etc.)',
      'Implementing IAM policies, encryption, and network segmentation',
      'Planning high availability, disaster recovery, and backup strategies',
      'Optimizing costs with Reserved Instances, Savings Plans, and right-sizing',
      'Creating architecture diagrams and documentation for engineering teams',
      'Supporting migrations from on-premises or other clouds',
    ],
  },
  {
    heading: 'Skills Required to Become an AWS Solutions Architect',
    body: 'Successful architects combine cloud service knowledge with networking, security, and systems thinking. You do not need to memorize every AWS service — focus on core patterns and the Well-Architected Framework pillars.\n\nEssential skill areas:',
    subheadings: [
      {
        title: 'Cloud fundamentals',
        body: 'Regions, Availability Zones, shared responsibility model, billing, and support plans.',
      },
      {
        title: 'Networking',
        body: 'VPC design, subnets, route tables, NAT, security groups, NACLs, DNS, and load balancers.',
      },
      {
        title: 'Compute & storage',
        body: 'EC2 families, Auto Scaling, EBS, S3 storage classes, EFS, and snapshot strategies.',
      },
      {
        title: 'Security & identity',
        body: 'IAM users, roles, policies, KMS, Secrets Manager, and least-privilege design.',
      },
      {
        title: 'Databases & serverless',
        body: 'RDS, DynamoDB, Aurora basics, Lambda, API Gateway, and event-driven patterns.',
      },
      {
        title: 'Operations & automation',
        body: 'CloudWatch, CloudTrail, Systems Manager, CloudFormation or Terraform basics.',
      },
    ],
  },
  {
    heading: 'AWS Solutions Architect Roadmap 2026',
    body: 'Follow these twelve phases in sequence. Spend 1–2 weeks per phase with labs and mini-projects before moving on. By Phase 12 you should be exam-ready and portfolio-ready.',
    subheadings: [
      {
        title: 'Phase 1: Cloud Computing Fundamentals',
        body: 'Learn cloud vs on-premises, AWS global infrastructure, console navigation, billing alerts, and the Well-Architected Framework (operational excellence, security, reliability, performance, cost optimization, sustainability).',
      },
      {
        title: 'Phase 2: Linux & Networking Basics',
        body: 'Comfort with SSH, file permissions, basic scripting, TCP/IP, DNS, HTTP/HTTPS, and troubleshooting connectivity — essential before deep VPC work.',
      },
      {
        title: 'Phase 3: AWS Core Services',
        body: 'Overview of compute, storage, database, networking, and security service categories. Understand when to use managed vs self-managed services.',
      },
      {
        title: 'Phase 4: Compute Services (EC2)',
        body: 'Launch instances, AMIs, instance types, placement groups, Elastic IPs, user data, and integration with security groups and IAM roles.',
      },
      {
        title: 'Phase 5: Storage Services (S3, EBS, EFS)',
        body: 'S3 buckets, versioning, lifecycle policies, encryption, static website hosting; EBS volume types and snapshots; EFS for shared file storage.',
      },
      {
        title: 'Phase 6: Networking & Security (VPC, IAM)',
        body: 'Design custom VPCs with public/private subnets, Internet and NAT gateways, VPC endpoints, IAM roles for services, and policy writing.',
      },
      {
        title: 'Phase 7: Databases (RDS, DynamoDB)',
        body: 'Relational patterns with RDS (Multi-AZ, read replicas); NoSQL with DynamoDB (partition keys, GSIs, capacity modes); backup and restore.',
      },
      {
        title: 'Phase 8: Load Balancing & Auto Scaling',
        body: 'Application Load Balancer, target groups, health checks, Auto Scaling groups, and designing for elasticity under traffic spikes.',
      },
      {
        title: 'Phase 9: Monitoring & Logging',
        body: 'CloudWatch metrics, alarms, dashboards, logs, CloudTrail for audit, and SNS notifications for operational alerts.',
      },
      {
        title: 'Phase 10: Serverless Computing',
        body: 'Lambda functions, triggers (API Gateway, S3, EventBridge), DynamoDB integration, and when serverless beats EC2.',
      },
      {
        title: 'Phase 11: Infrastructure as Code',
        body: 'Provision repeatable environments with CloudFormation or Terraform — modules, state, and CI/CD for infrastructure changes.',
      },
      {
        title: 'Phase 12: High Availability & Disaster Recovery',
        body: 'Multi-AZ and multi-region patterns, RTO/RPO planning, Route 53 routing policies, CloudFront CDN, and backup strategies.',
      },
    ],
  },
  {
    heading: 'AWS Projects to Build in 2026',
    body: 'Portfolio projects prove you can architect — not just pass exams. Build and document these on GitHub with architecture diagrams:',
    bullets: [
      'Static website on S3 + CloudFront + ACM HTTPS',
      'Three-tier VPC app: ALB → EC2 → RDS with private subnets',
      'Serverless REST API: API Gateway + Lambda + DynamoDB',
      'Automated backup and snapshot lifecycle with EventBridge',
      'Multi-AZ highly available web application with Auto Scaling',
      'Terraform or CloudFormation module library for a standard VPC',
      'Capstone: OTT, e-commerce, or SaaS architecture with HA, monitoring, and cost notes',
    ],
  },
  {
    heading: 'AWS Solutions Architect Certification Path (SAA-C03)',
    body: 'The AWS Certified Solutions Architect – Associate (SAA-C03) validates your ability to design solutions on AWS. Plan 8–12 weeks of study after completing the roadmap phases.\n\nExam domains (approximate weight):\n\n• Design secure architectures — 30%\n• Design resilient architectures — 26%\n• Design high-performing architectures — 24%\n• Design cost-optimized architectures — 20%\n\nUse official AWS skill builder resources, practice exams, and scenario-based questions. Avoid dump-only prep — employers test architecture reasoning in interviews.',
  },
  {
    heading: 'Essential AWS Tools & Services',
    body: 'Master this core toolkit before exploring niche services:',
    bullets: [
      'Compute: EC2, Lambda, Elastic Beanstalk (awareness)',
      'Storage: S3, EBS, EFS, Glacier',
      'Networking: VPC, Route 53, CloudFront, API Gateway, Direct Connect (awareness)',
      'Security: IAM, KMS, WAF, Shield (awareness), Secrets Manager',
      'Databases: RDS, DynamoDB, ElastiCache (awareness)',
      'Management: CloudWatch, CloudTrail, Systems Manager, Config (awareness)',
      'IaC: CloudFormation, Terraform (third-party but industry standard)',
    ],
  },
  {
    heading: 'Common Mistakes Beginners Make',
    bullets: [
      'Skipping networking fundamentals and struggling with VPC design later',
      'Using root account credentials for daily work instead of IAM users/roles',
      'Leaving S3 buckets public or over-permissive security groups',
      'Ignoring cost alarms and surprise bills from idle resources',
      'Memorizing services without understanding trade-offs (EC2 vs Lambda, SQL vs NoSQL)',
      'No hands-on projects — certification alone without portfolio gaps',
      'Jumping to Kubernetes or advanced services before mastering core AWS patterns',
    ],
  },
  {
    heading: 'AWS Career Opportunities',
    body: 'AWS expertise opens paths across industries — tech, finance, healthcare, e-commerce, and consulting.',
    bullets: [
      'AWS Solutions Architect / Cloud Architect',
      'Cloud Engineer / Infrastructure Engineer',
      'DevOps Engineer / Platform Engineer',
      'Site Reliability Engineer (SRE)',
      'Cloud Security Engineer',
      'Cloud Consultant / Pre-Sales Solutions Architect',
    ],
  },
  {
    heading: 'Expected Salary Trends in 2026',
    body: 'Compensation varies by experience, location, and employer type. AWS-certified architects with portfolio projects typically command premium salaries compared to general IT roles.\n\nIndicative ranges (2026, approximate — verify locally):',
    table: {
      headers: ['Experience', 'India (annual)', 'US / Remote (annual)'],
      rows: [
        ['Entry (0–2 yrs)', '₹6–12 LPA', '$85k–110k'],
        ['Mid (3–5 yrs)', '₹12–22 LPA', '$110k–145k'],
        ['Senior (5+ yrs)', '₹22–40+ LPA', '$145k–180k+'],
      ],
    },
  },
  {
    heading: 'Final Learning Plan',
    body: 'A practical 12-week schedule for working professionals (8–10 hours/week):',
    bullets: [
      'Weeks 1–2: Phases 1–2 (fundamentals + Linux/networking)',
      'Weeks 3–5: Phases 3–6 (core services, EC2, storage, VPC/IAM)',
      'Weeks 6–8: Phases 7–9 (databases, scaling, monitoring)',
      'Weeks 9–10: Phases 10–12 (serverless, IaC, HA/DR) + first portfolio project',
      'Weeks 11–12: SAA-C03 review, practice exams, capstone project polish',
    ],
  },
  {
    heading: 'Frequently Asked Questions (FAQs)',
    subheadings: [
      {
        title: 'How long does it take to become an AWS Solutions Architect?',
        body: 'With consistent part-time study (8–10 hrs/week), most learners build strong foundations in 3–4 months and can sit for SAA-C03 within 4–6 months including projects.',
      },
      {
        title: 'Do I need programming experience?',
        body: 'Basic scripting (Python or Bash) helps for automation and Lambda, but architecture roles focus more on design, networking, and service selection than heavy coding.',
      },
      {
        title: 'Is SAA-C03 enough to get a job?',
        body: 'Certification plus 3–5 portfolio projects and clear architecture diagrams matter more than the badge alone. Interviewers ask scenario-based design questions.',
      },
      {
        title: 'AWS vs Azure vs GCP — which first?',
        body: 'AWS has the largest job market globally. Skills transfer across clouds; depth on one platform beats shallow knowledge of all three.',
      },
      {
        title: 'Can beginners start with this roadmap?',
        body: 'Yes. Start with cloud and Linux basics. Zyvotrix AWS program is designed for beginners to intermediate learners with mentor-led labs.',
      },
    ],
  },
  {
    heading: 'Conclusion',
    body: 'The AWS Solutions Architect path in 2026 rewards structured learning, hands-on projects, and scenario-based thinking. Follow the twelve phases, build a visible portfolio, and align your study with SAA-C03 domains.\n\nReady for mentor-led training with live sessions, Terraform labs, and 7+ architecture projects? Explore the Zyvotrix AWS Solutions Architect Certification Program for a complete path from fundamentals to exam-ready confidence.',
  },
];
