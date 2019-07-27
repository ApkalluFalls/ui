import { navigation } from './Navigation';

export default () => ({
  container: {
    padding: {
      bottom: 16,
      left: 16 + navigation.width,
      right: 16,
      top: 16
    },
  }
});