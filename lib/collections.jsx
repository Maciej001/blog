Posts = new Mongo.Collection('posts');
Posts.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Posts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

let PostsSchema = new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this post published",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
  "author": {
    type: String,
    label: "The ID of the author of this post.",
    autoValue() {
      let user = Meteor.users.findOne( { _id: this.userId });
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;  // using Template strings - allow to include embedded expressions
      }
    }
  },
  "updated": {
    type: Boolean,
    label: "The date this post was last updated on.",
    autoValue() {
      return ( new Date().toISOString() ) ;
    }
  },
  "title": {
    type: String,
    label: "The title of this post.",
    defaultValue: "Untitled Post"
  },
  "slug": {
    type: String,
    label: "The slug for this post.",
    autoValue() {
      let slug = this.autoValue,
      existingSlugCount = Posts.find( { _id: { $ne: this.docId }, slug: slug } ).count(),
      existingUntitled =  Posts.find( { slug: { $regex: /untitled-post/i } }).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-post-${ existingUntitled + 1 }` : 'untitled-post';
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this post.",
    optional: true
  },
  "tags": {
    type: [ String ],
    label: "The tags for this post.",
    optional: true
  }
});

Posts.attachSchema( PostsSchema );

