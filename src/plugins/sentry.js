import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://aaf3f129220d40cc932790dd397aef98@sentry.io/2521729',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});