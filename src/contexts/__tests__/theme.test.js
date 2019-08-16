import { themes } from '../theme';

// Custom match logic from https://stackoverflow.com/a/57527075/1317805.
function hasEqualStructure(obj1, obj2) {
  return Object.keys(obj1).every(key => {
      const v = obj1[key];

      if (typeof v === 'object' && v !== null) {
          return hasEqualStructure(v, obj2[key]);
      }

      if (!obj2.hasOwnProperty(key)) {
        console.log(`Missing property: ${key}.`);
      }

      return obj2.hasOwnProperty(key);
  });
}

export default function toMatchStructure(theme2, theme1) {
  const pass = hasEqualStructure(theme2, theme1);

  return {
      message: () => `expected ${theme1.key} to match structure ${theme2.key}`,
      pass
  };
}

expect.extend({
  toMatchStructure,
});

test('dark theme has all properties from light theme', () => {
  expect(themes.light).toMatchStructure(themes.dark);
});

test('light theme has all properties from dark theme', () => {
  expect(themes.dark).toMatchStructure(themes.light);
})