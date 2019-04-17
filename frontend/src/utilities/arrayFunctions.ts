export class AH {
  static insertElement = <T extends string | object | number>(
    arr: T[],
    idx: number,
    el: T
  ) => [...arr.slice(0, idx), el, ...arr.slice(idx)];

  static replaceElement = <T extends string | object | number>(
    arr: T[],
    idx: number,
    el: T
  ) => [...arr.slice(0, idx), el, ...arr.slice(idx + 1)];

  static modifyElement = <T extends string | object | number>(
    arr: T[],
    idx: number,
    action: (el: T) => T = (el: T) => el
  ) => [...arr.slice(0, idx), action(arr[idx]), ...arr.slice(idx + 1)];

  static deleteElement = <T extends string | object | number>(
    arr: T[],
    idx: number
  ) => [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}
