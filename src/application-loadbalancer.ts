import {Construct} from "constructs";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import { ApplicationLoadBalancer, ApplicationLoadBalancerProps, HttpCodeElb } from "aws-cdk-lib/aws-elasticloadbalancingv2";

interface BridgeApplicationLoadbalancerProps extends ApplicationLoadBalancerProps {}

export class BridgeApplicationLoadbalancer extends ApplicationLoadBalancer {
    public albTargetResponseTimeAlarm: cloudwatch.Alarm;
    public albHTTPELB5XXCountAlarm: cloudwatch.Alarm;

    constructor(scope: Construct, id: string, props: BridgeApplicationLoadbalancerProps) {
        super(scope, id, {
            ...props
        });

        this.albTargetResponseTimeAlarm = this.addCloudwatchTargetResponseTimeAlarm(props);
        this.albHTTPELB5XXCountAlarm = this.addCloudwatchHTTPELB5XXCountAlarm(props);
    }

    private addCloudwatchTargetResponseTimeAlarm(props: BridgeApplicationLoadbalancerProps) {
        const metric = this.metrics.targetResponseTime()
        return new cloudwatch.Alarm(this, `${props.loadBalancerName}-TargetResponseTimeAlarm`, {
            alarmName: `${props.loadBalancerName}-TargetResponseTimeAlarm`,
            metric: metric,
            threshold: 300,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when target response time exceeds the threshold of 5 min',
            actionsEnabled: true,
        });
    }

    private addCloudwatchHTTPELB5XXCountAlarm(props: BridgeApplicationLoadbalancerProps) {
        const metric = this.metrics.httpCodeElb(HttpCodeElb.ELB_5XX_COUNT);
        return new cloudwatch.Alarm(this, `${props.loadBalancerName}-HTTPELB5XXCountAlarm`, {
            alarmName: `${props.loadBalancerName}-HTTPELB5XXCountAlarm`,
            metric: metric,
            threshold: 10,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when HTTP ELB 500 level error count exceeds the threshold',
            actionsEnabled: true,
        });
    }
}
