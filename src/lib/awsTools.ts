import { toolIcon } from '@/lib/toolIcons';

export interface AwsTool {
  name: string;
  icon: string;
}

const aws = toolIcon('aws.png');

/** Tools aligned to the 12-module AWS Solutions Architect curriculum */
export const AWS_TOOLS: AwsTool[] = [
  { name: 'Amazon EC2', icon: aws },
  { name: 'Amazon VPC', icon: aws },
  { name: 'Amazon S3', icon: aws },
  { name: 'AWS IAM', icon: aws },
  { name: 'Amazon RDS', icon: aws },
  { name: 'DynamoDB', icon: aws },
  { name: 'Route 53', icon: aws },
  { name: 'CloudFront', icon: aws },
  { name: 'AWS Lambda', icon: aws },
  { name: 'API Gateway', icon: aws },
  { name: 'SNS & SQS', icon: aws },
  { name: 'CloudWatch', icon: aws },
  { name: 'CloudTrail', icon: aws },
  { name: 'Auto Scaling', icon: aws },
  { name: 'Elastic Load Balancing', icon: aws },
  { name: 'CloudFormation', icon: aws },
  { name: 'Terraform', icon: toolIcon('terraform.svg') },
  { name: 'Git & GitHub', icon: toolIcon('github.svg') },
  { name: 'Linux', icon: toolIcon('linux.svg') },
  { name: 'Docker', icon: toolIcon('docker.svg') },
];
