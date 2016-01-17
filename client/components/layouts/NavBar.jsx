NavBar = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  handleSignOut() {
    Meteor.logout((error, success) => {
      if (error) console.log(error);
      FlowRouter.go("/");
    });
  },

  render() {

    let dataTarge = '#navbar-$';

    return (  
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href={ this.props.brandLink }>{ this.props.brand }</a>
            </div>

          </div>
        </div>
      </nav>
    )
  }
})
  