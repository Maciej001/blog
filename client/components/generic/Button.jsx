Button = React.createClass({
  render() {
    return (
      if ( this.props.href ) {
        return 
          <a href={ this.props.href } className={ `btn btn-${ this.props.style }` }>
            { this.props.label }
          </a>
      } else {
        return
          <button type={ this.props.type } className={ `btn btn-${ this.props.style}` }>
            { this.props.label }
          </button>
      }
    )
  }
})
  