import sequencer from "./sequencer"

describe("Calculating note interval from bpms", function() {

  it("should return correct interval in milliseconds", function() {
    expect(sequencer.getTiming(120, 4, 16)).toEqual(125);
  });

});

describe("Randomise a value in any range", function() {

  	const ranges = [
  		[0.3, 1],
  		[100, 1000],
  		[2, 67],
  		[300, 1400],
  		[1500, 400],
  		[100, 10]
  	]

  	ranges.forEach((range) => {

		  it(`should return a value between ${range[0]} and ${range[1]}`, function() {
		    expect(sequencer.getRndInRange(range)).toBeLessThan(Math.max(range[0],range[1]));
		    expect(sequencer.getRndInRange(range)).toBeGreaterThan(Math.min(range[0],range[1]));
		  });
  	});

});