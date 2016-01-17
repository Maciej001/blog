AppHeader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/posts' : '/',
      currentUser: Meteor.user()
    }
  },

  handleSignOut() {
    Meteor.logout((error, success) => {
      if (error) console.log(error);
      FlowRouter.go("index");
    });
  },

  render() {  
    return  (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href={ this.data.brandLink }>MiFF Blog</a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              { this.data.currentUser ? 
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"  onClick={ this.handleSignOut }>Sign Out</a></li>
                </ul>
              : 
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/signin">Sign In</a></li>
                  <li><a href="/signup">Sign Up</a></li>
                </ul>
              }

              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Empty</a></li>
              </ul>

            </div>

          </div>
        </div>
      </nav>
    )

  }
});

