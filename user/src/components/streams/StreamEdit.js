import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import history from '../../customHistory';

const StreamEdit = (props) => {

  //Get the ID of the target post
  const {id} = useParams();

  //Fetch the target Post from store once the StreamEdit.js component mounted
  useEffect(() => {
    props.fetchStream(id);
  }, [id])

  //editStream Action Creator
  const onSubmit = (formValues) => {
    props.editStream(id, formValues)
  }

  //Render Method to load the data into form values
  const renderPost = () => {
    return (
      <StreamForm 
        //we can use _pick(this.props.stream[id], 'title, 'description') from lodash to destructure the values 
        initialValues={{title: props.stream[id].title, description: props.stream[id].description}}
        onSubmit={onSubmit}
      />
    )
  }

  if(!props.stream[id]) {
    return <div>Loading..</div>
  }

  return <div>{renderPost()}</div>
}

const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams}
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit)