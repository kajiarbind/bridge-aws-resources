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
exports.BridgeSQS = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
class BridgeSQS extends aws_cdk_lib_1.aws_sqs.Queue {
    constructor(scope, id, props) {
        super(scope, id, Object.assign({}, props));
        const metric = this.metricApproximateAgeOfOldestMessage();
        const alarm = new cloudwatch.Alarm(this, `${props.queueName}-ApproximateAgeOfOldestMessageAlarm`, {
            alarmName: `${props.queueName}-ApproximateAgeOfOldestMessageAlarm`,
            metric: metric,
            threshold: 600,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 600sec',
            actionsEnabled: true,
        });
    }
}
exports.BridgeSQS = BridgeSQS;
