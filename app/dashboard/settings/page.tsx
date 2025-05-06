import type { Metadata } from 'next'
import UserSettings  from './userSettings'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
      <UserSettings />
  )
}
