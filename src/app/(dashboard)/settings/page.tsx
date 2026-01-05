"use client"

import { useEffect, useState } from "react"
import {
  Button,
  Switch,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material"

import {
  FiGlobe,
  FiBell,
  FiShield,
  FiMonitor,
  FiSave,
  FiSettings,
  FiSearch,
} from "react-icons/fi"
import { SectionCard } from "./SectionCard"
import { SettingRow } from "./SettingRow"


const SETTINGS_KEY = "app_settings_v2"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [openToast, setOpenToast] = useState(false)

  const [settings, setSettings] = useState({
    general: {
      language: "en",
      timezone: "UTC+7",
    },
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
    },
    appearance: {
      theme: "dark",
      compactMode: false,
    },
  })

  // Load localStorage
  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY)
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const updateSetting = (section: any, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    setIsSaving(false)
    setHasChanges(false)
    setOpenToast(true)
  }

  const tabs = [
    { id: "general", label: "General", icon: FiGlobe },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "security", label: "Security", icon: FiShield },
    { id: "appearance", label: "Appearance", icon: FiMonitor },
  ]

  return (
    <div className="">
      <div className="mx-auto px-6 py-14">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-semibold uppercase">
              <FiSettings />
              Settings
            </div>
            <h1 className="text-3xl font-bold mt-2">Application Settings</h1>
            <p className="text-gray-500 mt-1">
              Manage preferences, security, and interface options
            </p>
          </div>

          <Button
            variant="contained"
            disabled={!hasChanges || isSaving}
            onClick={handleSave}
            startIcon={
              isSaving ? <CircularProgress size={16} /> : <FiSave />
            }
            className="rounded-full px-8 h-11"
          >
            Save
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="space-y-6">
            <TextField
              size="small"
              placeholder="Search settings..."
              InputProps={{
                startAdornment: <FiSearch className="mr-2 text-gray-400" />,
              }}
              sx={{marginBottom: 2}}
              className="mb-6"
            />

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition
                    ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="space-y-8">
            {activeTab === "general" && (
              <SectionCard
                title="Language & Region"
                description="Localization and timezone preferences"
                icon={FiGlobe}
              >
                <SettingRow label="Language">
                  <Select
                    size="small"
                    value={settings.general.language}
                    onChange={(e) =>
                      updateSetting("general", "language", e.target.value)
                    }
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="vi">Vietnamese</MenuItem>
                  </Select>
                </SettingRow>

                <SettingRow label="Timezone">
                  <Select
                    size="small"
                    value={settings.general.timezone}
                    onChange={(e) =>
                      updateSetting("general", "timezone", e.target.value)
                    }
                  >
                    <MenuItem value="UTC+7">UTC+7</MenuItem>
                    <MenuItem value="UTC+8">UTC+8</MenuItem>
                  </Select>
                </SettingRow>
              </SectionCard>
            )}

            {activeTab === "notifications" && (
              <SectionCard
                title="Notifications"
                description="How you receive system updates"
                icon={FiBell}
              >
                <SettingRow label="Email notifications">
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) =>
                      updateSetting(
                        "notifications",
                        "email",
                        e.target.checked
                      )
                    }
                  />
                </SettingRow>

                <SettingRow label="Push notifications">
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) =>
                      updateSetting(
                        "notifications",
                        "push",
                        e.target.checked
                      )
                    }
                  />
                </SettingRow>
              </SectionCard>
            )}

            {activeTab === "security" && (
              <SectionCard
                title="Security"
                description="Protect your account"
                icon={FiShield}
              >
                <SettingRow label="Two-factor authentication">
                  <Switch
                    checked={settings.security.twoFactor}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "twoFactor",
                        e.target.checked
                      )
                    }
                  />
                </SettingRow>

                <SettingRow label="Session timeout">
                  <Select
                    size="small"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "sessionTimeout",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">60 minutes</MenuItem>
                  </Select>
                </SettingRow>
              </SectionCard>
            )}

            {activeTab === "appearance" && (
              <SectionCard
                title="Appearance"
                description="UI & layout preferences"
                icon={FiMonitor}
              >
                <SettingRow label="Theme">
                  <Select
                    size="small"
                    value={settings.appearance.theme}
                    onChange={(e) =>
                      updateSetting(
                        "appearance",
                        "theme",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System</MenuItem>
                  </Select>
                </SettingRow>

                <SettingRow label="Compact mode">
                  <Switch
                    checked={settings.appearance.compactMode}
                    onChange={(e) =>
                      updateSetting(
                        "appearance",
                        "compactMode",
                        e.target.checked
                      )
                    }
                  />
                </SettingRow>
              </SectionCard>
            )}
          </main>
        </div>
      </div>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          Settings saved successfully
        </Alert>
      </Snackbar>
    </div>
  )
}
