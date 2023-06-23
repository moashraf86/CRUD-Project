import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams, deleteStream } from '../../actions';
import Modal from '../Modal';

class StreamList extends React.Component {
  
  state = {
    modal: false,
    showNotification: false,
    streamId: null
  }
  
  componentDidMount() {
    this.props.fetchStreams()
    console.log(this.state)
  }

  removeStream () {
    this.props.deleteStream(this.state.streamId)
    this.handleModal()
    this.setState({ showNotification: true });

    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 1000);
  }

  renderAdminButtons(stream) {
    if(this.props.currentUserId === stream.userId) {
      return (
        <div className='flex items-center gap-2'>
          <Link to={`/streams/edit/${stream.id}`} className='border border-gray-300 px-3 py-1 rounded-sm'>Edit</Link>
          <button onClick={() => this.handleModal(stream.id)} className='bg-red-600 text-slate-50 px-3 py-1 rounded-sm'>Delete</button>
        </div>
      )
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return(
        <div className='flex items-center justify-between p-3 mb-4 border border-gray-300' key={stream.id}>
          <div>
            <Link to={`${stream.id}`}>{stream.title}</Link>
            <p>{stream.description}</p>
          </div>
          <div>{this.renderAdminButtons(stream)}</div>
        </div>
      )
    })
  }

  renderCreateButton() {
    if(this.props.isSignedIn) {
      return (
        <div className='bg-blue-500 text-slate-50 py-1 px-3 rounded-sm'>
          <Link to="/streams/new">+ Create Stream</Link>
        </div>
      )
    }
  }

  // Handle Delete Modal Visibility
  handleModal = (id) => {
    this.setState({modal: !this.state.modal , streamId: id})
  }

  //Modal actions
  actions = () => {
    return (
      <React.Fragment>
        <button onClick={() => this.removeStream()} className='flex-1 p-2 bg-red-600 text-white rounded-sm'>Delete</button>
        <button onClick={() => this.handleModal()} className='flex-1 p-2 bg-slate-300 text-gray-800 rounded-sm'>Cancel</button>
      </React.Fragment>
    )
  }

  //Render Modal
  renderModal() {
    if(this.state.modal) {
      return (
        <Modal 
          title      = {'Delete Stream'}
          message     = {'Do you want to delete this Stream?'}
          actions      = {this.actions()}
          onDismiss     = {() => this.handleModal()}
       />
      )
    
    }
  }

  //render Delete Notification
  deleteNotification = () => {
    return (
      <p className='fixed text-center top-0 p-4 w-[180px] right-[50%] mr-[-90px] bg-red-200 border border-gray-100 rounded-sm text-red-900'>Stream Deleted</p>
    )
  }
  render() {
    return (
      <div className='px-4 md:px-16 py-5'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='font-semibold text-xl'>Streams</h2>
          {this.renderCreateButton()}
        </div>
        <div>{this.renderList()}</div>
        {this.renderModal()}
        {this.state.showNotification && this.deleteNotification()}
      </div>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}
export default connect(mapStateToProps, {fetchStreams, deleteStream})(StreamList)