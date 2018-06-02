import * as React from 'react' 
import { connect } from 'react-redux';

const GlobalLoading = ({isLoading}: {isLoading: boolean}) => {
  if (isLoading) {
    return (
      <div></div>
    )
  }
  return null
}

function mapStateToProps(state: any) {

  const { application } = state;
  return {
    isLoading: application.isLoading
  }
}

export default connect(mapStateToProps)(GlobalLoading);

