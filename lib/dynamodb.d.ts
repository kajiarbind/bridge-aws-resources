import { aws_dynamodb } from "aws-cdk-lib";
import { Construct } from "constructs";
interface BridgeDynamoDbProps extends aws_dynamodb.TableProps {
}
export declare class BridgeDynamoDb extends aws_dynamodb.Table {
    constructor(scope: Construct, id: string, props: BridgeDynamoDbProps);
    private addCloudwatchConsumedReadCapacityUnitsAlarm;
    private addCloudwatchConsumedWriteCapacityUnitsAlarm;
}
export {};
