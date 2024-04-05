import { aws_dynamodb } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
interface BridgeDynamoDbProps extends aws_dynamodb.TableProps {
}
export declare class BridgeDynamoDb extends aws_dynamodb.Table {
    dynamoDbConsumedReadCapacityAlarm: cloudwatch.Alarm;
    dynamoDbConsumedWriteCapacityAlarm: cloudwatch.Alarm;
    constructor(scope: Construct, id: string, props: BridgeDynamoDbProps);
    private addCloudwatchConsumedReadCapacityUnitsAlarm;
    private addCloudwatchConsumedWriteCapacityUnitsAlarm;
}
export {};
