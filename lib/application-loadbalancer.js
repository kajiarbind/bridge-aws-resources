"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeApplicationLoadbalancer = void 0;
const cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
const aws_elasticloadbalancingv2_1 = require("aws-cdk-lib/aws-elasticloadbalancingv2");
class BridgeApplicationLoadbalancer extends aws_elasticloadbalancingv2_1.ApplicationLoadBalancer {
    constructor(scope, id, props) {
        super(scope, id, Object.assign({}, props));
        this.albTargetResponseTimeAlarm = this.addCloudwatchTargetResponseTimeAlarm(props);
        this.albHTTPELB5XXCountAlarm = this.addCloudwatchHTTPELB5XXCountAlarm(props);
    }
    addCloudwatchTargetResponseTimeAlarm(props) {
        const metric = this.metrics.targetResponseTime();
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
    addCloudwatchHTTPELB5XXCountAlarm(props) {
        const metric = this.metrics.httpCodeElb(aws_elasticloadbalancingv2_1.HttpCodeElb.ELB_5XX_COUNT);
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
exports.BridgeApplicationLoadbalancer = BridgeApplicationLoadbalancer;
