export default function count(arrays) {
  arrays.sort();
  var results = [];
  var current = null;
  var cnt = 0;
  for (var i = 0; i < arrays.length; i++) {
    if (arrays[i] !== current) {
      if (cnt > 0) {
        results.push(cnt);
      }
      current = arrays[i];
      cnt = 1;
    } else {
      cnt++;
    }
  }
  if (cnt > 0) {
    results.push(cnt);
  }
  return results;
}