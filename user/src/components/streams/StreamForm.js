import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

  renderError({error, touched}){
    if(touched && error) {
      return (
        <div className='text-red-600'>{error}</div>
      )
    }
  }

  renderInput = ({input, label, meta}) => {
    const className = `border rounded-sm px-3 bg-gray-100 focus:outline-blue-400 ${meta.touched && meta.error ? 'border-red-500': ''}`
    return (
      <div className='flex flex-col w-full mb-4'>
        <label className='block mb-1 text-sm text-slate-800 font-semibold'>{label}</label>
        <input className={className} {...input} />
        {this.renderError(meta)}
      </div>
    )
  }

  //handleSubmit callback function
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form  onSubmit={this.props.handleSubmit(this.onSubmit)} className='flex flex-col items-center justify-center w-[250px] h-[80vh] mx-auto'>
        <Field name='title' component={this.renderInput} label='Enter a label' />
        <Field name='description' component={this.renderInput} label='Enter a description' />
        <button className='bg-blue-500 text-slate-50 py-1 px-3 rounded-sm w-full'>Submit</button>
      </form>
    )
  }
}

// Vlidate Function
const validate = (formValues) => {

  const errors = {};
  //check if the user did not enter a title
  if(!formValues.title) {
    errors.title = 'You must enter a title'
  }

  //check if the user did not enter a description
  if(!formValues.description) {
    errors.description = 'You must enter a description'
  }

  return errors;
}

export default reduxForm({
  form: 'StreamForm',
  validate: validate
})(StreamForm)

// export default connect(null, {createStream})(formWrapper)