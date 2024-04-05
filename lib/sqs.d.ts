import { aws_sqs } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
interface BridgeSqsProps extends aws_sqs.QueueProps {
}
export declare class BridgeSQS extends aws_sqs.Queue {
    sqsApproxAgeOfOldestMessageAlarm: cloudwatch.Alarm;
    constructor(scope: Construct, id: string, props: BridgeSqsProps);
}
export {};
