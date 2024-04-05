import { Construct } from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import { ApplicationLoadBalancer, ApplicationLoadBalancerProps } from "aws-cdk-lib/aws-elasticloadbalancingv2";
interface BridgeApplicationLoadbalancerProps extends ApplicationLoadBalancerProps {
}
export declare class BridgeApplicationLoadbalancer extends ApplicationLoadBalancer {
    albTargetResponseTimeAlarm: cloudwatch.Alarm;
    albHTTPELB5XXCountAlarm: cloudwatch.Alarm;
    constructor(scope: Construct, id: string, props: BridgeApplicationLoadbalancerProps);
    private addCloudwatchTargetResponseTimeAlarm;
    private addCloudwatchHTTPELB5XXCountAlarm;
}
export {};
