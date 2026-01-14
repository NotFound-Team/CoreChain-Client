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
  InputAdornment,
} from "@mui/material"

import {
  FiGlobe,
  FiBell,
  FiShield,
  FiMonitor,
  FiSave,
  FiSettings,
  FiSearch,
  FiDatabase,
  FiLayout,
  FiCpu,
  FiCode,
} from "react-icons/fi"
import { SectionCard } from "./SectionCard"
import { SettingRow } from "./SettingRow"
import { settingsService } from "@/services/settings.service"
import { JsonEditorWrapper } from "./JsonEditorWrapper"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // State maps roughly to the API structure, but flattened/organized for UI where needed
  // Complex objects are kept as pretty-printed JSON strings for editing
  const [settings, setSettings] = useState<any>({
    // --- General / i18n / URLs ---
    common: {
      site_url: "",
      api_base_url: "",
      app_url: "",
      default_locale: "en",
    },
    // --- Metadata ---
    metadata: {
      title: "",
      description: "",
      keywords: "", // Joined by comma
      canonical_url: "",
      favicon_url: "",
      robots: {
        index: true,
        follow: true,
      },
      og: {
        title: "",
        description: "",
        image_url: "",
      },
    },
    // --- Appearance ---
    appearance: {
      site_title: "",
      theme: "light",
      primary_color: "",
      secondary_color: "",
      logo_url: "",
      compactMode: false,
    },
    // --- System ---
    system: {
      maintenance_mode: false,
      timezone: "UTC+7",
      max_upload_mb: 10,
    },
    // --- Security / Bot Protection ---
    security: {
      session_timeout_minutes: 60,
      allow_registration: true,
      bot_enabled: true,
      twoFactor: false, // Legacy
    },
    // --- Features ---
    features: {
      dark_mode: true,
      public_site: true,
      enable_blog: false,
    },
    // --- Raw JSON Content (Header, Footer, Home) ---
    content: {
      header: "{}",
      footer: "{}",
      home: "{}",
    }
  })

  useEffect(() => {
    const fetchSettings = async () => {
        try {
            const data: any = await settingsService.getSettings();
            
            setSettings({
                common: {
                    site_url: data.urls?.web_url || "",
                    api_base_url: data.urls?.api_base_url || "",
                    app_url: data.urls?.app_url || "",
                    default_locale: data.i18n?.default_locale || "en",
                },
                metadata: {
                    title: data.metadata?.title || "",
                    description: data.metadata?.description || "",
                    keywords: data.metadata?.keywords?.join(", ") || "",
                    canonical_url: data.metadata?.canonical_url || "",
                    favicon_url: data.metadata?.favicon_url || "",
                    robots: {
                        index: data.metadata?.robots?.index ?? true,
                        follow: data.metadata?.robots?.follow ?? true,
                    },
                    og: {
                        title: data.metadata?.og?.title || "",
                        description: data.metadata?.og?.description || "",
                        image_url: data.metadata?.og?.image_url || "",
                    },
                },
                appearance: {
                    site_title: data.appearance?.site_title || "",
                    theme: data.appearance?.theme || "light",
                    primary_color: data.appearance?.primary_color || "",
                    secondary_color: data.appearance?.secondary_color || "",
                    logo_url: data.appearance?.logo_url || "",
                    compactMode: false, 
                },
                system: {
                    maintenance_mode: data.system?.maintenance_mode || false,
                    timezone: data.system?.timezone || "Asia/Ho_Chi_Minh",
                    max_upload_mb: data.system?.max_upload_mb || 10,
                },
                security: {
                    session_timeout_minutes: data.security?.session_timeout_minutes || 60,
                    allow_registration: data.security?.allow_registration ?? true,
                    bot_enabled: data.bot_protection?.enabled ?? true,
                    twoFactor: false,
                },
                features: {
                    dark_mode: data.features?.dark_mode ?? true,
                    public_site: data.features?.public_site ?? true,
                    enable_blog: data.features?.enable_blog ?? false,
                },
                content: {
                    header: JSON.stringify(data.header || {}, null, 2),
                    footer: JSON.stringify(data.footer || {}, null, 2),
                    home: JSON.stringify(data.home || {}, null, 2),
                }
            });
        } catch (error) {
            console.error("Failed to load settings", error);
            setErrorMessage("Failed to load settings from server.");
        }
    }
    fetchSettings();
  }, [])

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateMetadata = (key: string, value: any) => {
      setSettings((prev: any) => ({
          ...prev,
          metadata: {
              ...prev.metadata,
              [key]: value
          }
      }));
      setHasChanges(true);
  }

  const updateNestedMetadata = (parent: string, key: string, value: any) => {
      setSettings((prev: any) => ({
          ...prev,
          metadata: {
              ...prev.metadata,
              [parent]: {
                  ...prev.metadata[parent],
                  [key]: value
              }
          }
      }));
      setHasChanges(true);
  }

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");
    try {
        const payload: any = {};
        
        // --- 1. URLs ---
        payload.urls = {
            web_url: settings.common.site_url,
            app_url: settings.common.app_url,
            api_base_url: settings.common.api_base_url,
        };

        // --- 2. i18n ---
        payload.i18n = { 
            default_locale: settings.common.default_locale,
            supported_locales: ["en", "vi"], // hardcoded or managed elsewhere
            fallback_locale: "en"
        };

        // --- 3. Metadata ---
        payload.metadata = {
            title: settings.metadata.title,
            description: settings.metadata.description,
            keywords: settings.metadata.keywords.split(",").map((k: string) => k.trim()).filter(Boolean),
            canonical_url: settings.metadata.canonical_url,
            favicon_url: settings.metadata.favicon_url,
            site_url: settings.common.site_url, // Syncing site_url to metadata as well
            robots: {
                index: settings.metadata.robots.index,
                follow: settings.metadata.robots.follow,
            },
            og: {
                title: settings.metadata.og.title,
                description: settings.metadata.og.description,
                image_url: settings.metadata.og.image_url,
            }
        };

        // --- 4. Appearance ---
        payload.appearance = {
            site_title: settings.appearance.site_title,
            theme: settings.appearance.theme,
            primary_color: settings.appearance.primary_color,
            secondary_color: settings.appearance.secondary_color,
            logo_url: settings.appearance.logo_url,
        };

         // --- 5. System ---
        payload.system = {
            maintenance_mode: settings.system.maintenance_mode,
            timezone: settings.system.timezone,
            max_upload_mb: Number(settings.system.max_upload_mb),
        };

        // --- 6. Security ---
        payload.security = {
            session_timeout_minutes: Number(settings.security.session_timeout_minutes),
            allow_registration: settings.security.allow_registration,
        };
        payload.bot_protection = {
             enabled: settings.security.bot_enabled
        };

        // --- 7. Features ---
        payload.features = {
            dark_mode: settings.features.dark_mode,
            public_site: settings.features.public_site,
            enable_blog: settings.features.enable_blog,
        };

        // --- 8. Complex JSON Content ---
        try {
            payload.header = JSON.parse(settings.content.header);
            payload.footer = JSON.parse(settings.content.footer);
            payload.home = JSON.parse(settings.content.home);
        } catch (e) {
            throw new Error("Invalid JSON in Content section");
        }

        await settingsService.updateSettings(payload);
        
        setHasChanges(false);
        setOpenToast(true);
    } catch (error: any) {
        console.error("Failed to save settings", error);
        setErrorMessage(error.message || error.response?.data?.message || "Failed to save settings");
    } finally {
        setIsSaving(false);
    }
  }

  const tabs = [
    { id: "general", label: "General", icon: FiGlobe },
    { id: "metadata", label: "SEO & Metadata", icon: FiSearch },
    { id: "appearance", label: "Appearance", icon: FiMonitor },
    { id: "system", label: "System", icon: FiCpu },
    { id: "security", label: "Security", icon: FiShield },
    { id: "features", label: "Features", icon: FiLayout },
    { id: "content", label: "Content (JSON)", icon: FiCode },
  ]

  return (
    <div className="font-sans min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold uppercase tracking-wider bg-indigo-50 w-fit px-3 py-1 rounded-full mb-3">
              <FiSettings className="w-4 h-4" />
              <span>Settings & Configuration</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">System Preferences</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your application's behavior, appearance, and content.
            </p>
          </div>

          <Button
            variant="contained"
            disabled={!hasChanges || isSaving}
            onClick={handleSave}
            startIcon={
              isSaving ? <CircularProgress size={18} color="inherit" /> : <FiSave className="w-5 h-5" />
            }
            sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '10px 24px',
                borderRadius: '99px',
                boxShadow: hasChanges ? '0 10px 15px -3px rgba(79, 70, 229, 0.3)' : 'none',
                background: hasChanges ? 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)' : undefined
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <div className="mb-4 px-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Menu</p>
                <nav className="space-y-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ease-in-out
                            ${
                            activeTab === tab.id
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }
                        `}
                    >
                    <tab.icon className={`text-lg ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`} />
                    {tab.label}
                    </button>
                ))}
                </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="space-y-6">
            {activeTab === "general" && (
              <SectionCard title="General Settings" description="Configure basic site parameters and regional preferences." icon={FiGlobe}>
                <SettingRow label="Default Language" description="The primary language of the user interface.">
                  <Select
                    size="small"
                    value={settings.common.default_locale}
                    onChange={(e) => updateSetting("common", "default_locale", e.target.value)}
                    className="min-w-[140px]"
                  >
                    <MenuItem value="en">English (US)</MenuItem>
                    <MenuItem value="vi">Tiếng Việt</MenuItem>
                  </Select>
                </SettingRow>
                <div className="p-5 grid grid-cols-1 gap-5 bg-gray-50/50 rounded-xl mt-4">
                    <TextField 
                        fullWidth size="small" label="Website URL" variant="outlined" 
                        value={settings.common.site_url} onChange={(e) => updateSetting("common", "site_url", e.target.value)} 
                        helperText="The public URL where your frontend is hosted"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField fullWidth size="small" label="App URL" value={settings.common.app_url} onChange={(e) => updateSetting("common", "app_url", e.target.value)} />
                        <TextField fullWidth size="small" label="API Base URL" value={settings.common.api_base_url} onChange={(e) => updateSetting("common", "api_base_url", e.target.value)} />
                    </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "metadata" && (
              <SectionCard title="SEO & Metadata" description="Optimize your site for search engines and social sharing." icon={FiSearch}>
                <div className="space-y-6 py-2">
                    {/* Basic SEO */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Basic SEO</h4>
                        <div className="space-y-4">
                            <TextField 
                                fullWidth size="small" label="Meta Title" 
                                value={settings.metadata.title} onChange={(e) => updateMetadata("title", e.target.value)} 
                                InputProps={{ className: "font-medium" }}
                            />
                            <TextField 
                                fullWidth multiline rows={3} size="small" label="Meta Description" 
                                value={settings.metadata.description} onChange={(e) => updateMetadata("description", e.target.value)}
                                placeholder="A brief summary of your page content..."
                            />
                            <TextField 
                                fullWidth size="small" label="Keywords" 
                                value={settings.metadata.keywords} onChange={(e) => updateMetadata("keywords", e.target.value)} 
                                helperText="Separate keywords with commas (e.g. blockchain, hr, saas)"
                            />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField 
                                    fullWidth size="small" label="Canonical URL" 
                                    value={settings.metadata.canonical_url} onChange={(e) => updateMetadata("canonical_url", e.target.value)} 
                                />
                                <TextField 
                                    fullWidth size="small" label="Favicon URL" 
                                    value={settings.metadata.favicon_url} onChange={(e) => updateMetadata("favicon_url", e.target.value)} 
                                />
                             </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Crawling & Indexing (Robots)</h4>
                        <div className="flex gap-8">
                             <SettingRow label="Index Page" description="Allow search engines to index this site.">
                                <Switch checked={settings.metadata.robots.index} onChange={(e) => updateNestedMetadata("robots", "index", e.target.checked)} />
                            </SettingRow>
                            <SettingRow label="Follow Links" description="Allow search engines to follow links.">
                                <Switch checked={settings.metadata.robots.follow} onChange={(e) => updateNestedMetadata("robots", "follow", e.target.checked)} />
                            </SettingRow>
                        </div>
                    </div>

                     <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Social Sharing (Open Graph)</h4>
                         <div className="space-y-4">
                            <TextField 
                                fullWidth size="small" label="OG Title" 
                                value={settings.metadata.og.title} onChange={(e) => updateNestedMetadata("og", "title", e.target.value)} 
                                placeholder="Leave empty to use Meta Title"
                            />
                             <TextField 
                                fullWidth multiline rows={2} size="small" label="OG Description" 
                                value={settings.metadata.og.description} onChange={(e) => updateNestedMetadata("og", "description", e.target.value)} 
                                placeholder="Leave empty to use Meta Description"
                            />
                             <TextField 
                                fullWidth size="small" label="OG Image URL" 
                                value={settings.metadata.og.image_url} onChange={(e) => updateNestedMetadata("og", "image_url", e.target.value)} 
                                placeholder="https://..."
                            />
                         </div>
                    </div>
                </div>
              </SectionCard>
            )}

            {activeTab === "appearance" && (
              <SectionCard title="Theme & Branding" description="Customize the look and feel of your application." icon={FiMonitor}>
                <SettingRow label="Interface Theme" description="Set the default appearance mode for new visitors.">
                  <Select size="small" value={settings.appearance.theme} onChange={(e) => updateSetting("appearance", "theme", e.target.value)} className="min-w-[120px]">
                    <MenuItem value="light">Light Mode</MenuItem>
                    <MenuItem value="dark">Dark Mode</MenuItem>
                  </Select>
                </SettingRow>
                 <div className="p-5 space-y-5 bg-gray-50/50 rounded-xl mt-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField fullWidth size="small" label="Site Name (Brand)" value={settings.appearance.site_title} onChange={(e) => updateSetting("appearance", "site_title", e.target.value)} />
                        <TextField fullWidth size="small" label="Logo URL" value={settings.appearance.logo_url} onChange={(e) => updateSetting("appearance", "logo_url", e.target.value)} />
                     </div>
                     <div className="grid grid-cols-2 gap-5">
                        <TextField 
                            fullWidth size="small" label="Primary Color" 
                            value={settings.appearance.primary_color} onChange={(e) => updateSetting("appearance", "primary_color", e.target.value)} 
                            InputProps={{
                                startAdornment: <div className="w-4 h-4 rounded-full mr-2 border border-gray-200" style={{ backgroundColor: settings.appearance.primary_color}}></div>
                            }}
                        />
                        <TextField 
                            fullWidth size="small" label="Secondary Color" 
                            value={settings.appearance.secondary_color} onChange={(e) => updateSetting("appearance", "secondary_color", e.target.value)} 
                            InputProps={{
                                startAdornment: <div className="w-4 h-4 rounded-full mr-2 border border-gray-200" style={{ backgroundColor: settings.appearance.secondary_color}}></div>
                            }}
                        />
                     </div>
                </div>
              </SectionCard>
            )}

             {activeTab === "system" && (
              <SectionCard title="System Configuration" description="Manage core system behaviors and limits." icon={FiCpu}>
                <SettingRow label="Maintenance Mode" description="Temporarily disable access for non-admin users.">
                  <Switch checked={settings.system.maintenance_mode} onChange={(e) => updateSetting("system", "maintenance_mode", e.target.checked)} color="warning" />
                </SettingRow>
                <SettingRow label="System Timezone" description="Global timezone for date and time operations.">
                    <Select size="small" value={settings.system.timezone} onChange={(e) => updateSetting("system", "timezone", e.target.value)} className="min-w-[200px]">
                        <MenuItem value="UTC+7">Asia/Ho_Chi_Minh (UTC+7)</MenuItem>
                        <MenuItem value="UTC">Coordinated Universal Time (UTC)</MenuItem>
                    </Select>
                </SettingRow>
                 <SettingRow label="Max Upload Size" description="Maximum allowed file size for user uploads (in MB).">
                    <TextField 
                        type="number" size="small" 
                        value={settings.system.max_upload_mb} onChange={(e) => updateSetting("system", "max_upload_mb", e.target.value)} 
                        InputProps={{ endAdornment: <span className="text-gray-500 text-xs ml-1">MB</span> }}
                        sx={{width: 120}} 
                    />
                </SettingRow>
              </SectionCard>
            )}

            {activeTab === "security" && (
              <SectionCard title="Security & Access" description="Control authentication policies and bot protection." icon={FiShield}>
                <SettingRow label="Public Registration" description="Allow new users to create accounts freely.">
                  <Switch checked={settings.security.allow_registration} onChange={(e) => updateSetting("security", "allow_registration", e.target.checked)} />
                </SettingRow>
                <SettingRow label="Bot Protection" description="Enable captcha/turnstile challenges for forms.">
                  <Switch checked={settings.security.bot_enabled} onChange={(e) => updateSetting("security", "bot_enabled", e.target.checked)} />
                </SettingRow>
                <SettingRow label="Session Timeout" description="Automatically log users out after inactivity.">
                    <TextField 
                        type="number" size="small" 
                        value={settings.security.session_timeout_minutes} onChange={(e) => updateSetting("security", "session_timeout_minutes", e.target.value)} 
                        InputProps={{ endAdornment: <span className="text-gray-500 text-xs ml-1">min</span> }}
                        sx={{width: 120}} 
                    />
                </SettingRow>
              </SectionCard>
            )}

             {activeTab === "features" && (
              <SectionCard title="Feature Flags" description="Toggle system modules on or off." icon={FiLayout}>
                <SettingRow label="Dark Mode" description="Allow users to switch to dark theme.">
                  <Switch checked={settings.features.dark_mode} onChange={(e) => updateSetting("features", "dark_mode", e.target.checked)} />
                </SettingRow>
                <SettingRow label="Public Landing Page" description="Enable the public-facing marketing site.">
                   <Switch checked={settings.features.public_site} onChange={(e) => updateSetting("features", "public_site", e.target.checked)} />
                </SettingRow>
                <SettingRow label="Blog Module" description="Enable the CMS/Blog features.">
                   <Switch checked={settings.features.enable_blog} onChange={(e) => updateSetting("features", "enable_blog", e.target.checked)} />
                </SettingRow>
              </SectionCard>
            )}

            {activeTab === "content" && (
              <SectionCard title="Advanced Content Editor" description="Directly edit layout schemas as JSON." icon={FiCode}>
                 <div className="space-y-8 py-2">
                    <JsonEditorWrapper
                        label="Header Configuration"
                        value={settings.content.header}
                        onChange={(val) => updateSetting("content", "header", val || "{}")}
                        height="250px"
                    />
                     <JsonEditorWrapper
                        label="Footer Configuration"
                        value={settings.content.footer}
                        onChange={(val) => updateSetting("content", "footer", val || "{}")}
                        height="250px"
                    />
                     <JsonEditorWrapper
                        label="Home Page Schema"
                        value={settings.content.home}
                        onChange={(val) => updateSetting("content", "home", val || "{}")}
                        height="500px"
                    />
                </div>
              </SectionCard>
            )}

          </main>
        </div>
      </div>

      <Snackbar
        open={openToast}
        autoHideDuration={4000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: '12px', bgcolor: '#059669' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%', borderRadius: '12px' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
