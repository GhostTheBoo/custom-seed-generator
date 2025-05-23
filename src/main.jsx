import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/styles.css'
import "react-widgets/scss/styles.scss"

import App from './App.jsx'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)