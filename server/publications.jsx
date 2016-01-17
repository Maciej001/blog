Posts.publicFields = {

}

// function instead of () => to keep the 'this' context. Eg. this.userId
Meteor.publish( 'postsList', function() {
  return Posts.find(); 
});

Meteor.publish( 'editor', ( postId ) => {
  check( postId, String );

  return [
    Posts.find( { _id: postId } ),
    Meteor.users.find( {}, { fileds: { profile: 1 } } )
  ];
});