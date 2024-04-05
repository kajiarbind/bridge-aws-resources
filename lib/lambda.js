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
exports.BridgeLambda = void 0;
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
const aws_logs_1 = require("aws-cdk-lib/aws-logs");
class BridgeLambda extends lambda.Function {
    constructor(scope, id, props) {
        super(scope, id, Object.assign({ logRetention: aws_logs_1.RetentionDays.ONE_YEAR }, props));
        this.addCloudwatchErrorAlarm(props);
    }
    addCloudwatchErrorAlarm(props) {
        const metric = this.metricErrors();
        new cloudwatch.Alarm(this, `${props.functionName}ErrorAlarm`, {
            alarmName: `${props.functionName}ErrorAlarm`,
            metric: metric,
            threshold: 5,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when Lambda function errors',
            actionsEnabled: true,
        });
    }
}
exports.BridgeLambda = BridgeLambda;
