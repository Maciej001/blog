PublicNavigation = React.createClass({

  render() {
    let menuItems = { uid: 'login', href: '/login', label: 'Log In' };
    return <div className="public-navigation">
      <h2>dupa</h2>
      <NavBarNav position={ `navbar-right` } items={ menuItems} />
    </div>;
  }
});