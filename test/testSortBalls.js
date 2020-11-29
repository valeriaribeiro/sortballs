const assert = require("chai").assert;
const expect = require("chai").expect;

const sortBalls = require("../sortBalls.js");

describe("Test Sort Ball", () => {
  describe("SortBall initialization methods", () => {
    it("should instantiate the game object properly", () => {
      for (let i = 5; i < 10; i++) {
        assert.doesNotThrow(() => {
          let game = new sortBalls(i);
        }, `shoul not throw with ${i} as paramater`);
      }
    });

    it("should create the right amount of buckets", () => {
      let numberOfBallTypes = 7;
      let game = new sortBalls(numberOfBallTypes);
      expect(game.getData()).to.have.lengthOf(numberOfBallTypes + 2);
    });

    it("should have buckets with the right maximum size", () => {
      let numberOfBallTypes = 7;
      let game = new sortBalls(numberOfBallTypes);
      let data = game.getData();
      expect(data).to.be.a("array");
      for (let bucket of data) {
        expect(bucket).to.be.a("array");
        assert(bucket.length <= 4, "Each bucket can have no more than 4 items");
      }
    });

    it("should create the right amount of items in the buckets", () => {
      let numberOfBallTypes = 7;
      let game = new sortBalls(numberOfBallTypes);
      let data = game.getData();
      let ballsCount = data.reduce((acc, v) => v.length + acc, 0);
      assert.equal(ballsCount, numberOfBallTypes * 4);
    });
  });
  describe("Action methods", () => {
    describe("canMove method tests", () => {
      describe("when the bucket is empty", () => {
        let bucket = [];
        it("should return true", () => {
          assert(sortBalls.canMove(1, bucket));
        });
      });

      describe("when the bucket is not full", () => {
        let bucket = [1, 2, 3];
        describe("when the top item is the same", () => {
          it("should return true", () => {
            let canMove = sortBalls.canMove(3, bucket);
            expect(canMove).to.be.true;
          });
        });

        describe("when the top item is not the same", () => {
          let item = 2;
          it("should return false", () => {
            expect(sortBalls.canMove(item, bucket)).to.be.false;
          });
        });
      });
      describe("when the bucket is full", () => {
        let bucket = [1, 2, 3, 4];
        it("should return false", () => {
          assert.isFalse(sortBalls.canMove(1, bucket));
          assert.isFalse(sortBalls.canMove(2, bucket));
          assert.isFalse(sortBalls.canMove(3, bucket));
          assert.isFalse(sortBalls.canMove(4, bucket));
        });
      });
    });
    describe("moveBall method tests", () => {
      describe("when the move parameters are valid", () => {
        let game;
        beforeEach("Initialize game", () => {
          game = new sortBalls(4);
        });
        describe("when moving a ball to a empty space", () => {
          it("should move the ball with success", () => {
            const sourceBucket = 0;
            const targetBucket = 4;

            let buckets = game.getData();
            const pickedBall = buckets[sourceBucket][3]
            game.moveBall(0, 4);
            expect(buckets[sourceBucket]).to.have.lengthOf(3);
            expect(buckets[targetBucket]).to.have.lengthOf(1);
            assert.equal(buckets[targetBucket][0], pickedBall);
          });
        });
      });
    });
  });
});
