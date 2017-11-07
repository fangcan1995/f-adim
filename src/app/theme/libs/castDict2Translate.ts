export const castDict2Translate = (dicts: any[] = [], translateFields: {fieldName: string, category?: string}[]) => {
  let map = new Map();
  translateFields.forEach(field => {
    map.set(field.fieldName, field.category ? field.category : field.fieldName);
  });
  let translate = {};
  dicts = dicts || [];
  map.forEach((category, fieldName) => {
    for (let i = 0; i < dicts.length; i++ ) {
      let dict = dicts[i];
      if (dict.category == category && dict.delFlag == '0' ) {
        if ( !translate[fieldName] ) translate[fieldName] = [];
        translate[fieldName].push(dict);
      }
    }
  });
  return translate;
};