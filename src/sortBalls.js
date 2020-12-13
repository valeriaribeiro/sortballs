class SortBalls {
  constructor(colorsAmount, bucketSize = 4) {
    const self = this;
    self.amount = colorsAmount;
    self.buckets = SortBalls.generate(colorsAmount, bucketSize);
  }

  static generate(amount, bucketSize) {
    let ballsStore = []
    for (let i = 0; i<amount; i++) {
      let ballsGroup = Array.from(new Array(bucketSize), (val, index) => i);
      ballsStore = [...ballsStore, ...ballsGroup];
    }

    // shuffle
    ballsStore = ballsStore.sort(() => Math.random() - 0.5);

    // put in buckets
    const buckets = [];
    for (let i = 0; i < amount; i++) {
      let size = i * bucketSize;
      buckets.push(ballsStore.slice(size, size + 4));
    }
    // add empty buckets
    buckets.push([], []);
    return buckets;
  }

  moveBall(sourcePos, destPos) {
    const self = this;
    const sourceBucket = self.buckets[sourcePos];
    const destBucket = self.buckets[destPos];
    const sourceBall = sourceBucket[sourceBucket.length - 1];
    if (SortBalls.canMove(sourceBall, destBucket)) {
      sourceBucket.pop();
      destBucket.push(sourceBall);
    } else {
      throw new Error("Invalid movement");
    }
  }

  static canMove(ball, bucket, bucketSize = 4) {
    // It's allowed if the bucket is empty
    if (bucket.length === 0) {
      return true;
    }

    // It's allowed if the bucket is not full and it's the same ball in the
    // top.
    // Forcing 4 as bucket size
    if (bucket.length < bucketSize) {
      return ball === bucket[bucket.length - 1];
    }
    return false;
  }

  getData() {
    return this.buckets;
  }
}

export default SortBalls;
