
interface Coordinate {
  lat: number;
  long: number;
}

class CoordinateBoundaries {
  coordinates: Coordinate[] = new Array(4).fill(null).map(() => { return { lat: 0, long: 0 } });
  minLat: number = 0;
  minLong: number = 0;
  maxLat: number = 0;
  maxLong: number = 0;
  constructor([...coordinates]: Coordinate[]) {
    this.coordinates =
      coordinates
        .reduce((acc, current, index, array) => {
          if (array.length > 2) {
            acc.push(current);
            return acc;
          }

          const cloner = { lat: current.lat, long: current.long };
          const lastElement = acc[acc.length - 1];

          const first = { ...cloner };
          const second = { ...cloner };

          if (!!lastElement && current.lat !== lastElement.lat) {
            first.long = lastElement.long;
            lastElement.long = cloner.long;
          }
          return [...acc, { ...first }, { ...second }]
        }, []).sort((a, b) => a.lat - b.lat);

    this.minLat = this.coordinates.reduce((acc, { lat }, i) => {
      if (i === 0) return lat;
      return Math.min(acc, lat)
    }, 0);

    this.maxLat = this.coordinates.reduce((acc, { lat }, i) => {
      if (i === 0) return lat;
      return Math.max(acc, lat)
    }, 0);

    this.minLong = this.coordinates.reduce((acc, { long }, i) => {
      if (i === 0) return long;
      return Math.min(acc, long)
    }, 0);

    this.maxLong = this.coordinates.reduce((acc, { long }, i) => {
      if (i === 0) return long;
      return Math.max(acc, long)
    }, 0);
  }

  belongBoundaries({ lat, long }: Coordinate) {
    return lat > this.minLat && lat < this.maxLat && long > this.minLong && long < this.maxLong;
  }

}

const SPAIN_BOUNDARIES: Array<Coordinate[]> = [
  //Iberian Peninsula, portugal subtracted
  [{ lat: 41.80, long: -9.3 },
  { lat: 43.80, long: 3.33 }],
  [{ lat: 36, long: 3.3 },
  { lat: 41.80, long: -7.54 }],
  //Balear islands
  [{ lat: 38.58, long: 1.15 },
  { lat: 40.09, long: 4.33 }],
  //Canary islands
  [{ lat: 27.63, long: -18.18 },
  { lat: 29.41, long: -13.42 }],
  //Ceuta
  [{ lat: 35.87, long: -5.383 },
  { lat: 35.918, long: -5.278 }],
  //Melilla
  [{ lat: 35.264, long: -2.97 },
  { lat: 35.32, long: -2.923 }]
];

class SpainBoundaries {
  boundaries = SPAIN_BOUNDARIES.map(elements => new CoordinateBoundaries(elements));
  belongsSpain(coordinates: Coordinate) {
    return this.boundaries.some(el => el.belongBoundaries(coordinates));
  }
}

const _spainBoundariesInstance = new SpainBoundaries();

export { CoordinateBoundaries, _spainBoundariesInstance as SpainBoundaries };
