import midi from "./midi"

describe("Calculating average time between clock events", function() {

  it("should return correct interval in milliseconds", function() {
    expect(midi.getAverageTimeBetweenClocks([20,22,24])).toEqual(22);
    expect(midi.getAverageTimeBetweenClocks([101,104,104])).toEqual(103);
  });

});
