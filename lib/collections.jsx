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

