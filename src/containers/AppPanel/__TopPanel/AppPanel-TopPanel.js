import React from 'react'

import SettingsPanel from '../../SettingsPanel/SettingsPanel'
import CurrentChatSettings from '../../CurrentChatSettings/CurrentChatSettings'

import './AppPanel-TopPanel.sass'

function TopPanel() {
  return (
    <div className="topPanel">
      <CurrentChatSettings />
      <SettingsPanel />
    </div>
  )
}

export { TopPanel }
