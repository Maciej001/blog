Posts.publicFields = {

}

// function instead of () => to keep the this context. Eg. this.userId
Meteor.publish('posts', function() {
  return Posts.find({}, {
    fields: Posts.publicFields
  }); 
});