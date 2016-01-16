
// Configuration

FlowRouter.notFound = {
  name: 'notFound',
  action() {
    ReactLayout.render( App, { yield:  <NotFound /> } );
  }
};

// Callback if login attempt succeeds
Accounts.onLogin(() => {
  let currentRoute = FlowRouter.current();
  if ( currentRoter && currentRoute.route.group.name === 'public' ) {

  }
});


// Public routes

const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route('/', {
  name: 'index',
  action() {
    ReactLayout.render( App, { yield: <PostsIndex /> } );
  }
});

publicRoutes.route( '/posts/:slug', {
  name: 'singlePost',
  action( params ) {
    ReactLayout.render( App, { yield: <SinglePost slug={ params.slug } /> });
  }
});

publicRoutes.route( '/tags/:tag', {
  name: 'tagIndex',
  action( params ) {
    ReactLayout.render( App, { yield: <PostIndex tag={ params.tag } /> });
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});



// Authentiacted routes

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/posts', {
  name: 'posts',
  action() {
    ReactLayout.render( App, { yield: <PostsList /> } );
  }
});

authenticatedRoutes.route( '/posts/:_id/edit', {
  name: 'editor',
  action( params ) {
    ReactLayout.render( App, { yield: <Editor post={ params._id } /> } );
  }
});