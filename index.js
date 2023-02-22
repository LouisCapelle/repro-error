import { registerRootComponent } from 'expo'
import App from './app/App.tsx'

registerRootComponent(App)

// Comment this to avoid Unhandled promise rejection RangeError: Maximum call stack size exceeded
// GitHub source workaround: https://github.com/infinitered/ignite/issues/1705#issuecomment-927926386
// import { StorybookUIRoot } from './storybook'
// registerRootComponent(App)
//registerRootComponent(StorybookUIRoot)
