Header = React.createClass({
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

    return (  
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
              <a className="navbar-brand" href="/">LOGO</a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              { this.data.currentUser ? 
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="#"  onClick={ this.handleSignOut }>SIGN OUT</a></li>
                </ul>
              :
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/signin">SIGN IN</a></li>
                  <li><a href="/signup">SIGN UP</a></li>
                </ul>
              }

              <ul className="nav navbar-nav navbar-right">
                <li><a href="/">ITEM 1</a></li>
                <li><a href="/">ITEM 2</a></li>
              </ul>

            </div>

          </div>
        </div>
      </nav>
    ) 
  }

    
});

