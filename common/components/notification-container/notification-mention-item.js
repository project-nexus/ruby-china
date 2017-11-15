import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'; // ES6

export default class NotificationMentionItem extends Component {

  render() {
    return <div>NotificationMentionItem</div>;
  }
}

NotificationMentionItem.propTypes = {
  notification: PropTypes.object.isRequired,
  actor: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired
};