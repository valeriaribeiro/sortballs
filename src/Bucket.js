import React, {Component } from 'react';
import './Bucket.css';

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.bucket = this.bucket.bind(this);
    this.colors = this.colors.bind(this);

    const defaultColors = {
      0: "#FF0000",
      1: "#00FF00",
      2: "#0000FF",
      3: "#FFFF00",
      4: "#FF00FF",
      5: "#00FFFF",
      6: "#808080"
    }

    let chosenColors = props.colors ? props.colors : defaultColors;

    this.canvasRef = React.createRef();

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
    const ctx = this.canvasRef.current.getContext('2d');
    for (let i = 0; i < reverseBucket.length; i++) {
      let posY = (1 + i)*(diameter + 1);
      ctx.beginPath();
      ctx.arc(ballSize + 5, posY, ballSize, 0, 2 * Math.PI, false);
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

  getBucket() {
    return this.state.bucket;
  }


  render() {
    let output = [];
    for (let [i, element] of this.getBucket().entries()) {
      output.push(<div key={i} background-color={this.getColor(element)}></div>);
    }
    return (
      <div className="bucket">
        <canvas ref={this.canvasRef} className="canvas-bucket" width={50} height={185} />
        {output}
      </div>
    );
  }
}

export default Bucket;
