import * as React from 'react';
import * as PropTypes from 'prop-types';


export default class TopicComponent extends React.PureComponent<any, any> {

  static propTypes = {
    dataSaverMode: PropTypes.bool,
    displayBlocked: PropTypes.bool,
    isPinned: PropTypes.bool,


    topic: PropTypes.object,
    topicId: PropTypes.string,


    withActions: PropTypes.bool,
    withCardLink: PropTypes.bool,
    withInlineMedia: PropTypes.bool,
    withSelfThread: PropTypes.bool,
    withSocialThread: PropTypes.bool,


    history: PropTypes.object,
    log: PropTypes.func,
  }


  render() {
    return (
      <div>

      </div>
    );
  }

}