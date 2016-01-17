Editor = React.createClass({

  mixins: [ ReactMeteorData ],

  getMeteorData() {
    let postSub = Meteor.subscribe( 'editor', this.props.post );

    return {
      postLoaded: postSub.ready(),
      post: Posts.findOne( { _id: this.props.post } )
    }
  },

  generateSlug( event ) {
    let { setValue }  = ReactHelpers,
        form          = this.refs.editPostForm.refs.form,
        title         = event.target.value;

    // getSlug - comes from ongoworks:speakingurl package
    // { custom: ...} - removes all apostrophes
    setValue( form, '[name="postSlug"]', getSlug( title, { custom: { "'": "" } } ) );
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

  handleSubmit( event ) {
    event.preventDefault();
  },

  render() {
    if ( !this.data.post ) { return <div />; }

    return (
      <GridRow>
        <GridColumn>
          <PageHeader size="h4" label="Edit Post" />
          <Form ref="editPostForm" id="edit-post" className="edit-post" validations={ this.validation() } onSubmit={ this.handleSubmit }>

            <p className="updated-date">
              <strong>Last Updated:</strong> { this.getLastUpdate() }
            </p>

            <FormGroup>
              <FormControl 
                style="checkbox"
                name="postPublished"
                id="post-published"
                label="Published?"
                defaultValue={ this.data.post && this.data.post.published }
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                showLabel={ false }
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
                style="textarea"
                name="postContent"
                label="Content"
                defaultValue={ this.data.post && this.data.post.content }
              />
            </FormGroup>

            <FormGroup>
              <FormControl
                showLabels={ false }
                style="input"
                type="text"
                name="postTags"
                label="Tags"
                defaultValue={ this.getTags() }
              />
            </FormGroup>

            <FormGroup>
              <SuccessButton type="submit" label="Save Post" />
            </FromGroup>

        </GridColumn>
      </GridRow>

    )

  }
})
  