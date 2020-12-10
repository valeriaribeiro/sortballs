import React, {Component } from 'react';
import './Bucket.css';

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.bucket = this.bucket.bind(this);
    this.colors = this.colors.bind(this);

    const defaultColors = {
      1: "#F94144",
      2: "#F3722C",
      3: "#F8961E",
      4: "#F9C74F",
      5: "#90BE6D",
      6: "#43AA8B",
      7: "#577590"
    }

    let chosenColors = props.colors ? props.colors : defaultColors;

    this.state = {
      bucket: props.bucket,
      colors: chosenColors,
    }

  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    let reverseBucket = [];
    for (let element of this.state.bucket) {
      reverseBucket.unshift(element);
    }
    const ballSize = 20;
    const diameter = ballSize * 2;
    const ctx = this.refs.canvas.getContext('2d');
    for (let i = 0; i < reverseBucket.length; i++) {
      let posY = (1 + i)*(diameter + 1);
      ctx.beginPath();
      ctx.arc(ballSize + 1, posY, ballSize, 0, 2 * Math.PI, false);
      ctx.fillStyle = this.getColor(reverseBucket[i]);
      ctx.fill();
    }
  }

  bucket(bucket) {
    this.setState({bucket: bucket});
  }

  colors(colors) {
    this.setState({colors: colors});
  }

  getColor(color) {
    return this.state.colors[color];
  }


  render() {
    let output = [];
    for (let element of this.state.bucket) {
      output.push(<div key={element} background-color={this.getColor(element)}></div>);
    }
    return (
      <div className="bucket">
        <canvas ref="canvas" width={50} height={200} />
        {output}
      </div>
    );
  }
}

export default Bucket;
