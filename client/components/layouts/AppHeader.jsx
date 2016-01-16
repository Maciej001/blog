AppHeader = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/posts' : '/',
      currentUser: Meteor.user()
    }
  },

  render() {  
    return 
      <NavBar id="app-header" 
              brandLink={ this.data.brandLink } 
              brand="Meteor if Flip Flops" 
      /> 
  }
});

