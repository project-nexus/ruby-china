import * as React from 'react';
import * as PropTypes from 'prop-types'; 

export default class NotificationMentionItem extends React.Component<any, any> {

  static propTypes = {
    notification: PropTypes.object.isRequired,
    actor: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired
  }

  render() {
    return <div>NotificationMentionItem</div>;
  }
}
