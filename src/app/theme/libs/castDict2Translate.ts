export const castDict2Translate = (dicts: any[] = [], map: Map<string, string>) => {
  let translate = {};
  map.forEach((dictKeyId, field) => {
    for (let i = 0; i < dicts.length; i++ ) {
      let dict = dicts[i];
      if (dict.dictKeyId == dictKeyId ) {
        if ( !translate[field] ) translate[field] = [];
        translate[field].push(dict);
      }
    }
  });
  return translate;
};