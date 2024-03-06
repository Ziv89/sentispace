import { useContext, useEffect, useState } from 'react'
import SettingsItem from '../../settings-item/SettingsItem'
import ApplePrompt from './ApplePrompt'
import { InstallPromptContext } from '../../../../data/contexts/InstallPromptContext'

const tested_browsers = [
  'Edge',
  'Opera',
  'Chrome',
  'Safari',
  'Firefox',
  'Brave',
]

const getBrowserInfo = (userAgent: string): string => {
  let browserName = 'Unknown Browser'
  let version = ''

  for (const browser of tested_browsers) {
    if (userAgent.indexOf(browser) > -1) {
      const match = userAgent.match(
        new RegExp('(?:' + browser + '|rv)[:\\s/]?(\\d+\\.?\\d*)'),
      )
      browserName = browser
      version = (match && match[1]) || ''
      break
    }
  }

  return `${browserName} ${version}`
}

const isInStandaloneMode = (window: Window) => {
  return (
    window.navigator.standalone ||
    window.matchMedia('(display-mode: standalone)').matches
  )
}

const InstallApp = () => {
  const installPromptContext = useContext(InstallPromptContext)
  const [isIOS, setIsIOS] = useState<boolean>(false)
  const [isApplePromptModalOpen, setIsApplePromptModalOpen] =
    useState<boolean>(false)

  useEffect(() => {
    const isIOSUserAgent = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSUserAgent)
  }, [])

  if (!installPromptContext) return null

  const { promptEvent, promptInstall } = installPromptContext

  const browserInfo = getBrowserInfo(navigator.userAgent)

  if (isInStandaloneMode(window)) return null

  if (isIOS) {
    return (
      <SettingsItem
        label="Install App"
        iconKey="DeviceMobile"
        onClick={() => setIsApplePromptModalOpen(true)}
      >
        {browserInfo}
        {isApplePromptModalOpen && (
          <ApplePrompt
            isOpen={isApplePromptModalOpen}
            onClose={() => setIsApplePromptModalOpen(false)}
          />
        )}
      </SettingsItem>
    )
  } else if (promptEvent) {
    return (
      <SettingsItem
        label="Install App"
        iconKey="DeviceMobile"
        value={browserInfo}
        onClick={promptInstall}
      />
    )
  }

  return null
}

export default InstallApp
