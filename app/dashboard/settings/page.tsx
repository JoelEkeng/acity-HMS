import type { Metadata } from 'next'
import UserSettings  from './userSettings'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <UserSettings />
    </div>
  )
}
