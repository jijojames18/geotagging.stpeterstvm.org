import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import './assets/main.scss'

const app = initializeApp(JSON.parse(import.meta.env.VITE_APP_FIREBASE_SDK_CONFIG))
const db = getFirestore(app)

createApp(App, { db }).mount('#app')
