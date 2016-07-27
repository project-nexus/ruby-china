import * as types from '../constants/action-types';
import 'isomorphic-fetch';
import { normalize, arrayOf } from 'normalizr';

import address from '../constants/address';
import { topicSchema, replySchema } from '../constants/schema';

function receiveTopics(entities, topics) {
  return {
    type: types.RECEIVE_TOPICS,
    entities,
    topics
  }
}

function receiveTopicReplies(entities, replies) {
  return {
    type: types.RECEIVE_TOPIC_REPLIES,
    entities,
    replies
  }
}

export function getTopic(id) {
  return dispatch => {
    dispatch(requestTopics());
    return fetch(address.topic(id))
      .then(res => res.json())
      .then(data => {
        const normalized = normalize([data.topic], arrayOf(topicSchema));
        dispatch(receiveTopics(normalized.entities, normalized.result));
      })
      .catch(e => console.log(e));
  }
}

export function getTopicReplies(id, offset, limit) {
  return dispatch => {
    dispatch(requestTopicReplies());
    return fetch(address.topicReplies(id, offset, limit))
      .then(res => res.json())
      .then(data => {
        const normalized = normalize(data.replies, arrayOf(replySchema));
        dispatch(receiveTopicReplies(normalized.entities, normalized.result));
      })
      .catch(e => console.log(e));
  }
}

export function postTopicReply(id, body) {
  return dispatch => {
    dispatch(createTopicReply());
    return fetch(address.replyTopic(id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: body
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(createTopicReplyDone());
      })
      .catch(e => console.log(e));

  }
}

export function fetchTopics(offset, limit, type) {
  return (dispatch) => {
    return fetch(address.topics(offset, limit, type))
      .then(res => res.json())
      .then(data => {
        const topics = data.topics;
        const normalized = normalize(topics, arrayOf(topicSchema));
        dispatch(receiveTopics(normalized.entities, normalized.result));
      })
      .catch((error) => { return {error: error.message} })
  };
}

export function fetchTopicDetail() {
}

