const module = () => ({
  hasPermission: jest.fn(() => Promise.resolve(true)),
  subscribeToTopic: jest.fn(),
  unsubscribeFromTopic: jest.fn(),
  requestPermission: jest.fn(() => Promise.resolve(true)),
  getToken: jest.fn(() => Promise.resolve('myMockToken')),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  getInitialNotification: jest.fn(() => Promise.resolve(false)),
  setBackgroundMessageHandler: jest.fn(),
  onTokenRefresh: jest.fn(),
})
module.AuthorizationStatus = {}
export default module
