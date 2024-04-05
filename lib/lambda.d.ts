import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
interface BridgeLambdaProps extends lambda.FunctionProps {
}
export declare class BridgeLambda extends lambda.Function {
    constructor(scope: Construct, id: string, props: BridgeLambdaProps);
    private addCloudwatchErrorAlarm;
}
export {};
