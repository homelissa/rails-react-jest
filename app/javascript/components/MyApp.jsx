import React from 'react';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "Super Guardant"};
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({name: "renamed"});
  }

  render() {
    return (
      <label>
        <input
          value={this.state.name}
          onChange={this.onChange}
        />
        {this.state.name}
      </label>
    );
  }
}


export default MyApp;
