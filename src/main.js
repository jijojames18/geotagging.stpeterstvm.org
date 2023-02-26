import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from 'firebase/app'

const app = initializeApp(import.meta.env.VITE_APP_FIREBASE_SDK_CONFIG)

import './assets/main.scss'

createApp(App).mount('#app')
