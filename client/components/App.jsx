App = React.createClass({

  mixins: [ ReactMeteorData ],

  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      isPublic( route ) {
        return [
          'index',
          'singlePost',
          'tagIndex',
          'login',
          'recoverPassword',
          'resetPassword',
          'notFound'
        ].indexOf( route ) > -1;
      },
      canView() {
        // if route is public or user is logged in
        // .getRouteName - returns route name and not the paths!
        return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
      },
    }
  },   

  getView() {
    return this.data.canView() ? this.props.yield : <SignIn />
  },

  render() {
    return (
      <div className="app-root">
          <AppHeader hasUser={ this.data.hasUser } />
          <div className="container">
            { this.data.loggingIn ? <Loading /> : this.getView() }
          </div>
      </div>
    )
  }
})
  