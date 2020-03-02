import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://74e8236057d54fc38b548ffa11bb8d24@sentry.io/3496257',
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  });
}
