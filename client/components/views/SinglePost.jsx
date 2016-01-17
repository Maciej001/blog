SinglePost = React.createClass({

  mixins: [ ReactMeteorData ], 

  getMeteorData() {
    let PostSub = Meteor.subscribe( 'singlePost', this.props.slug );

    return {
      post: Posts.findOne({ slug: this.props.slug }),
      postLoaded: PostSub.ready()
    }
  },

  render() {
    { this.data.postLoaded ? 
      return (
        <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
          <Post singlePost={ true } post={ this.data.post } />
        </GridColumn>  
      )
    :
      <div />;
    }
  }
})
  