// import { defineBackend } from '@aws-amplify/backend';
// import { auth } from './auth/resource.js';
// import { data } from './data/resource.js';

// defineBackend({
//   auth,
//   data,
// });

import { defineBackend } from "@aws-amplify/backend";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { data, generateHaikuFunction, MODEL_ID } from "./data/resource";

export const backend = defineBackend({
  auth,
  data,
  generateHaikuFunction,
});

backend.generateHaikuFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:Converse"],
    resources: [
      `arn:aws:bedrock:*::foundation-model/${MODEL_ID}`,
    ],
  })
);
