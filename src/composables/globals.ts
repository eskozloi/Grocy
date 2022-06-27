/* eslint-disable no-extend-native */

export {};

declare global {
  interface Array<T> {
    filterIndex(cb: (o: T) => boolean): number[];
  }
}

if (!Array.prototype.filterIndex) {
  Array.prototype.filterIndex = function (cb: (o: any) => boolean): number[] {
    return this.map((o, i) => [o, i])
      .filter(([o]) => cb(o))
      .map(([, i]) => i);
  };
}
