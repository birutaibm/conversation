import { Schema, Document, model } from 'mongoose';

import IConversation from '../IConversation';

const ConversationSchema = new Schema({
  email: String,
  emailConfirm: Boolean,
  messages: [
    {
      owner: String,
      content: String,
    },
  ],
});

type DocumentConversation = IConversation & Document;

export function extractInfo(
  registry: DocumentConversation | null,
): IConversation | undefined {
  if (registry) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: registry._id,
      email: registry.email,
      emailConfirm: registry.emailConfirm,
      messages: registry.messages,
    };
  }
  return undefined;
}

export default model<DocumentConversation>('Conversation', ConversationSchema);
