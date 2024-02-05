import 'tailwindcss/tailwind.css';

import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  console.log('Mocking enabled');
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
