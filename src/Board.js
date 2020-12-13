import React, {Component } from 'react';
import Bucket from './Bucket.js';
import sortBalls from './sortBalls.js';

class Board extends Component {
  constructor(props) {
    super(props);
    let gameInstance = new sortBalls(props.balls);
    this.state = {
      gameInstance
    }
  }
  renderBuckets() {
    const buckets = this.state.gameInstance.getData()
    const output = [];
    for (let [i, bucket] of buckets.entries()) {
      output.push(<Bucket key={i} bucket={bucket} />);
    }
    return output;
  }
  render() {
    return (this.renderBuckets());
  }
}
export default Board;
