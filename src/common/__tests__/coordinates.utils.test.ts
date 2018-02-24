import { CoordinateBoundaries, SpainBoundaries } from '../coordinates.utils';

describe('Coordinates Utils Test', () => {
  test('Boundaries belongin toBeTruthy test', () => {
    expect(
      new CoordinateBoundaries([{ lat: 0, long: 0 }, { lat: 10, long: 10 }]).belongBoundaries({
        lat: 5,
        long: 5
      })
    ).toBeTruthy();
    expect(
      new CoordinateBoundaries([{ lat: -9, long: -9 }, { lat: 10, long: 10 }]).belongBoundaries({
        lat: 5,
        long: 5
      })
    ).toBeTruthy();
  });

  test('Boundaries belongin toBeFalsy test', () => {
    expect(
      new CoordinateBoundaries([{ lat: 0, long: 0 }, { lat: 10, long: 10 }]).belongBoundaries({
        lat: 20,
        long: 5
      })
    ).toBeFalsy();
    expect(
      new CoordinateBoundaries([{ lat: -9, long: -9 }, { lat: 10, long: 10 }]).belongBoundaries({
        lat: -20,
        long: 5
      })
    ).toBeFalsy();
  });

  test('Belongs to spain, truthy', () => {
    expect(SpainBoundaries.belongsSpain({ lat: 40.34, long: -3.83 })).toBeTruthy();
    expect(SpainBoundaries.belongsSpain({ lat: 42.32, long: 3.3 })).toBeTruthy();
    expect(SpainBoundaries.belongsSpain({ lat: 37.18, long: -7.38 })).toBeTruthy();
    expect(SpainBoundaries.belongsSpain({ lat: 27.75, long: -18.15 })).toBeTruthy();
    expect(SpainBoundaries.belongsSpain({ lat: 27.739, long: -15.584 })).toBeTruthy();
  });
});
