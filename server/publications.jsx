Posts.publicFields = {

}

// function instead of () => to keep the 'this' context. Eg. this.userId
Meteor.publish( 'postsList', function() {
  return Posts.find(); 
});

Meteor.publish( 'editor', function ( postId ) {
  check( postId, String );

  return [
    Posts.find( { _id: postId } ),
    Meteor.users.find( {}, { fileds: { profile: 1 } } )
  ];
});

Meteor.publish( 'tagsIndex', function ( tag ) {
  check( tag, String );
  return Posts.find({ published: true, tags: { $in: [tag] } });
});

Meteor.publish( 'postsIndex', function() {
  return Posts.find({ published: true });
});

Meteor.publish( 'singlePost', function( slug ) {
  check( postSlug, String);
  return Posts.find({ slug: slug });
});