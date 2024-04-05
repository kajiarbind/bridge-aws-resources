import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import {Construct} from "constructs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

interface BridgeLambdaProps extends lambda.FunctionProps {}

export class BridgeLambda extends lambda.Function {
    public lambdaErrorAlarm: cloudwatch.Alarm;
    
    constructor(scope: Construct, id: string, props: BridgeLambdaProps) {
        super(scope, id, {
            logRetention: RetentionDays.ONE_YEAR,
            ...props,
        });

        this.lambdaErrorAlarm = this.addCloudwatchErrorAlarm(props);
    }

    private addCloudwatchErrorAlarm(props: BridgeLambdaProps) {
        const metric = this.metricErrors();
        return new cloudwatch.Alarm(this, `${props.functionName}-ErrorAlarm`, {
            alarmName: `${props.functionName}-ErrorAlarm`,
            metric: metric,
            threshold: 5,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when Lambda function errors',
            actionsEnabled: true,
        });
    }
}
