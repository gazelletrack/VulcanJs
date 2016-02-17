const ListContainer = React.createClass({

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    component: React.PropTypes.func.isRequired,
    publication: React.PropTypes.string.isRequired,
    terms: React.PropTypes.object,
    limit: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      limit: 5
    };
  },

  getInitialState() {
    return {
      limit: this.props.limit
    };
  },

  mixins: [ReactMeteorData],
  
  getMeteorData() {

    let terms = {...this.props.terms, limit: this.state.limit};
    let find = {};
    let options = {limit: this.state.limit}; 
    
    if (this.props.collection.parameters) {
      const parameters = this.props.collection.parameters.get(terms);
      find = parameters.find;
      options = parameters.options;
    }
    
    const subscription = Meteor.subscribe(this.props.publication, terms);

    const totalCount = Counts.get(this.props.publication);

    const cursor = this.props.collection.find(find, options);
    
    return {
      results: cursor.fetch(),
      ready: subscription.ready(),
      count: cursor.count(),
      totalCount: totalCount,
      hasMore: cursor.count() < totalCount
    };
  },

  loadMore(event) {
    event.preventDefault();
    this.setState({
      limit: this.state.limit+this.props.limit
    });
  },

  render() {
    const Component = this.props.component;
    return (
      <Component {...this.data} loadMore={this.loadMore}/>
    )
  }

});

// export default PostListContainer;

module.exports = ListContainer;