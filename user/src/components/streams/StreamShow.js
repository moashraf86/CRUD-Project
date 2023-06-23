import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const {id} = useParams();
  
  useEffect(() => {
    props.fetchStream(id);
    console.log(props.stream[id].title);
  }, [id])

  if(!props.stream[id]) {
    return <div>Loading...</div>
  }

  
  //render The selected Stream
  const renderStream = () => {
      return (
        <>
          <div>{props.stream[id].title}</div>
          <div>{props.stream[id].description}</div>  
        </>
      )
  }

  return <div>{renderStream()}</div>;
}

const mapStateToProps = (state) => {
  return {stream: state.streams}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow);