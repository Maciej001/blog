Alert = React.createClass({
  render() {
    return (
      <p classNamelassName={ `alert alert-${ this.props.style }` }>
        { this.props.children }
      </p>
    )
  }
})
  