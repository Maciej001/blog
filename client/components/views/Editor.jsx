Editor = React.createClass({

  propTypes: {
   postId: React.PropTypes.string
  },

  mixins: [ ReactMeteorData ],

  getMeteorData() {
    let postSub = Meteor.subscribe( 'editor', this.props.postId );

    return {
      postLoaded: postSub.ready(),
      post: Posts.findOne( { _id: this.props.post } )
    }
  },

  getInitialState() {
    let slug = getSlug( this.data.title, { custom: { "'": "" } } );
    return {
      slug: slug
    }
  },

  generateSlug( e ) {
    let slug = getSlug( this.refs.title.value, { custom: { "'": "" } } );
    this.setState({ slug: slug });
  },

  getLastUpdate() {
    if ( this.data ) {
      let { formatLastUpdate }  = ReactHelpers,
          post                  = this.data.post;

      return `${ formatLastUpdate( post.updated ) } by ${ post.author }`;
    }
  },

  getTags() {
    let post = this.data.post;

    if ( post && post.tags ) {
      return post.tags.join( ', ');
    }
  },

  handleSubmit( e ) {
    e.preventDefault();

    let post = {
      _id:        this.props.postId,
      title:      this.refs.title.value.trim(),
      slug:       this.state.slug,
      content:    this.refs.content.value.trim(),
      published:  this.refs.published.value,
      tags:       this.refs.tags.split(', ').map(( tag ) => tag.trim() )
    }

    Meteor.call( 'savePost', post, ( error, result ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( 'Post saved!', 'success' );
      }
    });
  },

  render() {
    if ( !this.data.post ) { return <div />; }


    // this.data.post && this.data.post.<some-property> - if both exist give the value of later
    return (
      <GridRow>
        <GridColumn>
          <PageHeader size="h4" label="Edit Post" />
          <Form ref="editPostForm" id="edit-post" className="edit-post" onSubmit={ this.handleSubmit }>

            <p className="updated-date">
              <strong>Last Updated:</strong> { this.getLastUpdate() }
            </p>

            <FormGroup>
              <FormControl 
                style="checkbox"
                ref="published"
                name="postPublished"
                id="post-published"
                label="Published?"
                defaultValue={ this.data.post && this.data.post.published }
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                showLabel={ false }
                ref="title"
                style="input"
                type="text"
                name="postTitle"
                label="Title"
                onChange={ this.generateSlug }
                defaultValue={ this.data.post && this.data.post.title }
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                showLabel={ false }
                ref="content"
                style="textarea"
                name="postContent"
                label="Content"
                defaultValue={ this.data.post && this.data.post.content }
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                showLabels={ false }
                ref="tags"
                style="input"
                type="text"
                name="postTags"
                label="Tags"
                defaultValue={ this.getTags() }
              />
            </FormGroup>

            <FormGroup>
              <SuccessButton type="submit" label="Save Post" />
            </FormGroup>

          </Form>

        </GridColumn>
      </GridRow>

    )

  }
})
  