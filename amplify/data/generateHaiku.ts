import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseCommandInput
} from "@aws-sdk/client-bedrock-runtime";
import type { Schema } from "./resource";

// initialize bedrock runtime client
const client = new BedrockRuntimeClient();

export const handler: Schema["generateHaiku"]["functionHandler"] = async (
  event,
  context
) => {
  // User prompt
  const prompt = event.arguments.prompt;

  // Converse model
  const input = {
    modelId: process.env.MODEL_ID,
    messages: [
      {
        role: "user",
        content: [
          {
            text: prompt
          }
        ]
      },
    ],
    system: [
      {
        text: "You are a an expert at crafting a haiku. You are able to craft a haiku out of anything and therefore answer only in haiku."
      }
    ],
    interfaceConfig: {
      maxTokens: 1000,
      temperature: 0.5,
    },
  } as ConverseCommandInput;

  const command = new ConverseCommand(input);

  const response = await client.send(command);

  // Parse the response and return the generated haiku
  const data = response.output?.message?.content?.[0]?.text;

  if (data) {
    return data;
  } else {
    throw new Error('Failed to generate haiku');
  }
};
