/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import 'jest-styled-components/native'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

global.__reanimatedWorkletInit = jest.fn()
global.ReanimatedDataMock = {
  now: () => 0,
}

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

jest.mock('graphql-ws')

jest.mock('react-native-video', () => 'Video')

jest.mock('react-native-safe-area-context', () => ({
  ...mockSafeAreaContext,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, right: 0, left: 0 }),
}))

jest.mock('@react-navigation/native/lib/commonjs/useLinking.native', () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}))

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => ''),
      },
    }
  },
  initReactI18next: {
    initReactI18next: 'initReactI18next',
  },
}))

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-maps', () => {
  const { View } = require('react-native')
  const React = require('react')

  const MockMapView = React.forwardRef(({ testID, children, ...props }, ref) => {
    if (ref?.current)
      ref.current = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        animateCamera: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        animateToRegion: () => {},
      }

    return (
      <View testID={testID} {...props}>
        {children}
      </View>
    )
  })

  const MockMarker = React.forwardRef(({ testID, children, ...props }, ref) => {
    if (ref?.current) ref.current = {}
    return (
      <View testID={testID} {...props}>
        {children}
      </View>
    )
  })

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    PROVIDER_GOOGLE: 'google',
  }
})

require('@shopify/flash-list/jestSetup')

jest.mock('@shopify/flash-list', () => {
  const React = require('react')
  const ActualFlashList = jest.requireActual('@shopify/flash-list').FlashList
  return {
    ...jest.requireActual('@shopify/flash-list'),
    FlashList: (props) => (
      <ActualFlashList
        {...props}
        estimatedListSize={{ height: 1000, width: 400 }}
        horizontal={false}
      />
    ),
  }
})

jest.mock('expo-notifications', () => ({
  ...jest.requireActual('expo-notifications'),
}))

const mockConsoleMethod = (realConsoleMethod) => {
  const ignoredMessages = [
    'test was not wrapped in act(...)',
    'No navigator object available to get browser client info',
    'Amplify has not been configured correctly',
  ]

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some((ignoredMessage) =>
      message.includes(ignoredMessage),
    )

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args)
    }
  }
}

jest.mock('react-native-pager-view', () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const React = require('react')
  const View = require('react-native').View

  return class ViewPager extends React.Component {
    // *********************
    // THIS WAS MISSING
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPage() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPageWithoutAnimation() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setScrollEnabled() {}
    // *********************

    render() {
      const {
        children,
        initialPage,
        onPageScroll,
        onPageScrollStateChanged,
        onPageSelected,
        style,
        scrollEnabled,
        accessibilityLabel,
      } = this.props

      return (
        <View
          testID={this.props.testID}
          initialPage={initialPage}
          onPageScroll={onPageScroll}
          onPageScrollStateChanged={onPageScrollStateChanged}
          onPageSelected={onPageSelected}
          style={style}
          scrollEnabled={scrollEnabled}
          accessibilityLabel={accessibilityLabel}
        >
          {children}
        </View>
      )
    }
  }
})

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native') // use original implementation, which comes with mocks out of the box

  // mock CameraView created by assigning to NativeModules
  RN.NativeModules.CameraView = {
    takePhoto: jest.fn().mockReturnValue('url.photo'),
    stopRecording: jest.fn().mockReturnValue(Promise.resolve()),
    startRecording: jest.fn().mockReturnValue(Promise.resolve()),
    pauseRecording: jest.fn(),
    resumeRecording: jest.fn(),
  }

  // mock AlarmClockModule created by assigning to NativeModules
  RN.NativeModules.AlarmClockModule = {
    setAlarmClock: jest.fn(),
    cancelAlarmClock: jest.fn(),
  }
  // mock LockScreenModule created by assigning to NativeModules
  RN.NativeModules.LockScreenModule = {
    checkCanDrawOverlaysPermission: jest.fn().mockReturnValue(Promise.resolve()),
    sendUserToDrawOverlaySettings: jest.fn(),
  }

  // mock modules created through UIManager
  RN.UIManager.getViewManagerConfig = (name) => {
    if (name === 'SomeNativeModule') {
      return { someMethod: jest.fn() }
    }
    return {}
  }

  return RN
})

// Suppress console errors and warnings to avoid polluting output in tests.
console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))
