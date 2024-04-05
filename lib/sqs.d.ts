import { aws_sqs } from "aws-cdk-lib";
import { Construct } from "constructs";
interface BridgeSqsProps extends aws_sqs.QueueProps {
}
export declare class BridgeSQS extends aws_sqs.Queue {
    constructor(scope: Construct, id: string, props: BridgeSqsProps);
}
export {};
