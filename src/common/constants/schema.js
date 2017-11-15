import { schema } from 'normalizr';

const topic = new schema.Entity('topics');

const user = new schema.Entity('users', {
  idAttribute: 'login',
  assignEntity: (output, key, value) => {
    if (key === 'avatar_url') {
      let match = value.match(/([a-zA-z]+:\/\/[^\s]*!)large/);
      if (match && match[1]) {
        output[key] = `${match[1]}lg`;
      } else {
        output[key] = value;
      }
    }
  }
});

const reply = new schema.Entity('replies');

const notification = new schema.Entity('notifications');

topic.define({
  user: user
});

reply.define({
  user: user
});

notification.define({
  actor: user,
  topic: topic,
  reply: reply
});

user.define({
  topics: [ topic ],
  replies: [ reply ],
  followers: [ user ],
  following: [ user ]
});

export const topicSchema = topic;
export const userSchema = user;
export const replySchema = reply;
export const notificationSchema = notification;
