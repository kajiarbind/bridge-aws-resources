import {aws_dynamodb} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";

interface BridgeDynamoDbProps extends aws_dynamodb.TableProps {}

export class BridgeDynamoDb extends aws_dynamodb.Table {
    constructor(scope: Construct, id: string, props: BridgeDynamoDbProps) {
        super(scope, id, {
            pointInTimeRecovery: true,
            ...props
        });

        this.addCloudwatchConsumedReadCapacityUnitsAlarm(props);
    }

    private addCloudwatchConsumedReadCapacityUnitsAlarm(props: BridgeDynamoDbProps) {
        const metric = this.metricConsumedReadCapacityUnits();
        new cloudwatch.Alarm(this, `${props.tableName}-ReadCapacityUnitsAlarm`, {
            alarmName: `${props.tableName}-ReadCapacityUnitsAlarm`,
            metric: metric,
            threshold: 10,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 10 read capacity',
            actionsEnabled: true,
        });
    }

    private addCloudwatchConsumedWriteCapacityUnitsAlarm(props: BridgeDynamoDbProps) {
        const metric = this.metricConsumedWriteCapacityUnits();
        new cloudwatch.Alarm(this, `${props.tableName}-WriteCapacityUnitsAlarm`, {
            alarmName: `${props.tableName}-WriteCapacityUnitsAlarm`,
            metric: metric,
            threshold: 10,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 10 write capacity',
            actionsEnabled: true,
        });
    }
}
