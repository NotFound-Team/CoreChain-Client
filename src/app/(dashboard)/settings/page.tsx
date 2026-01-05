'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Tabs,
  Tab,
  Divider,
  Paper,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  MdLanguage, 
  MdNotifications, 
  MdSecurity, 
  MdPalette, 
  MdSave, 
  MdInfo,
} from 'react-icons/md';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'UTC+7',
    dateFormat: 'DD/MM/YYYY',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactMode: false,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const SettingSection = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {description && (
          <Tooltip title={description}>
            <IconButton size="small">
              <MdInfo size={20} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {children}
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: 2 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdSave size={20} />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: theme.shadows[2],
          overflow: 'hidden',
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                minHeight: 64,
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            <Tab icon={<MdLanguage size={24} />} label="General" />
            <Tab icon={<MdNotifications size={24} />} label="Notifications" />
            <Tab icon={<MdSecurity size={24} />} label="Security" />
            <Tab icon={<MdPalette size={24} />} label="Appearance" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SettingSection
            title="Language & Region"
            description="Configure your preferred language and regional settings"
          >
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={generalSettings.language}
                label="Language"
                onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Vietnamese</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={generalSettings.timezone}
                label="Timezone"
                onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="UTC+7">UTC+7 (Bangkok)</MenuItem>
                <MenuItem value="UTC+8">UTC+8 (Singapore)</MenuItem>
                <MenuItem value="UTC+0">UTC+0 (London)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Date Format</InputLabel>
              <Select
                value={generalSettings.dateFormat}
                label="Date Format"
                onChange={(e) => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
              </Select>
            </FormControl>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <SettingSection
            title="Notification Preferences"
            description="Manage how and when you receive notifications"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Email Notifications"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) =>
                    setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Push Notifications"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onChange={(e) =>
                    setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Marketing Emails"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.securityAlerts}
                  onChange={(e) =>
                    setNotificationSettings({ ...notificationSettings, securityAlerts: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Security Alerts"
            />
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <SettingSection
            title="Security Settings"
            description="Configure your account security preferences"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Two-Factor Authentication"
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Session Timeout</InputLabel>
              <Select
                value={securitySettings.sessionTimeout}
                label="Session Timeout"
                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="15">15 minutes</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
                <MenuItem value="60">1 hour</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Password Expiry</InputLabel>
              <Select
                value={securitySettings.passwordExpiry}
                label="Password Expiry"
                onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="30">30 days</MenuItem>
                <MenuItem value="60">60 days</MenuItem>
                <MenuItem value="90">90 days</MenuItem>
              </Select>
            </FormControl>
          </SettingSection>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <SettingSection
            title="Appearance Settings"
            description="Customize the look and feel of your interface"
          >
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Theme</InputLabel>
              <Select
                value={appearanceSettings.theme}
                label="Theme"
                onChange={(e) => setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Font Size</InputLabel>
              <Select
                value={appearanceSettings.fontSize}
                label="Font Size"
                onChange={(e) => setAppearanceSettings({ ...appearanceSettings, fontSize: e.target.value })}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={appearanceSettings.compactMode}
                  onChange={(e) =>
                    setAppearanceSettings({ ...appearanceSettings, compactMode: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Compact Mode"
            />
          </SettingSection>
        </TabPanel>
      </Card>
    </Box>
  );
}
