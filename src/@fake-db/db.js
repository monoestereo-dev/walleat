import mock from './mock'

/* eslint-disable import/extensions */

// JWT
import './jwt'

// Users
import './data/apps/user'
import './data/apps/profile-data'
import './data/apps/account-setting'
import './data/apps/knowledge-base'
import './data/apps/faq-data'
import './data/apps/ecommerce'

/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
