export class SortValueConverter {
  toView(array) {
    return array.slice(0).sort((a, b) => { return (Date.parse(b.start_time) - Date.parse(a.start_time)) });
  }
}
