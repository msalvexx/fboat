import React from 'react'
import ReactDOM from 'react-dom'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import Login from '@/presentation/pages/login'

UIkit.use(Icons)

ReactDOM.render(
  <Login/>,
  document.getElementById('main')
)
