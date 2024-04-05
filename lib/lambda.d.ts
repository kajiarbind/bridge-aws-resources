import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from "constructs";
interface BridgeLambdaProps extends lambda.FunctionProps {
}
export declare class BridgeLambda extends lambda.Function {
    lambdaErrorAlarm: cloudwatch.Alarm;
    constructor(scope: Construct, id: string, props: BridgeLambdaProps);
    private addCloudwatchErrorAlarm;
}
export {};
