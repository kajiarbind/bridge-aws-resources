import {aws_sqs} from "aws-cdk-lib";
import {Construct} from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";

interface BridgeSqsProps extends aws_sqs.QueueProps {}

export class BridgeSQS extends aws_sqs.Queue {
    constructor(scope: Construct, id: string, props: BridgeSqsProps) {
        super(scope, id, {
            ...props
        });

        const metric = this.metricApproximateAgeOfOldestMessage();
        const alarm = new cloudwatch.Alarm(this, `${props.queueName}-ApproximateAgeOfOldestMessageAlarm`, {
            alarmName: `${props.queueName}-ApproximateAgeOfOldestMessageAlarm`,
            metric: metric,
            threshold: 600,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 600sec',
            actionsEnabled: true,
        })
    }

}
