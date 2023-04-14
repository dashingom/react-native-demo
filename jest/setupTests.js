import 'cross-fetch/polyfill';
import {server} from '../test/server';
import {store} from '../src/redux/store';
import {api} from '../src/redux/services/api';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers({onUnhandledRequest: 'error'});
  store.dispatch(api.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
