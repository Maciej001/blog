Form = React.createClass({

  handleSubmit( e ) {
    e.preventDefault();
  },

  componentDidMount() {
    let validations = this.props.validations;

    if ( validations ) {
      $( this.refs.form ).validate( validations );
    }
  },

  render() {
    return (
      <form 
        ref="form"
        id={ this.props.id }
        className={ this.props.className }
        onSubmit={ this.handleSubmit }
      >
        { this.props.children }

      </form>  
    )
        
  }
})
  
  