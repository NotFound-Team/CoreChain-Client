import { z } from "zod";

export const settingsSchema = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
    site_url: z.string().url(),
    canonical_url: z.string().url(),
    favicon_url: z.string(),
    robots: z.object({
      index: z.boolean(),
      follow: z.boolean(),
    }),
    og: z.object({
      title: z.string(),
      description: z.string(),
      image_url: z.string().url(),
    }),
  }),
  urls: z.object({
    web_url: z.string().url(),
    app_url: z.string().url(),
    api_base_url: z.string().url(),
  }),
  appearance: z.object({
    site_title: z.string(),
    logo_url: z.string(),
    primary_color: z.string(),
    secondary_color: z.string(),
    theme: z.enum(["light", "dark", "system"]).default("light"),
  }),
  i18n: z.object({
    default_locale: z.string(),
    supported_locales: z.array(z.string()),
    fallback_locale: z.string(),
  }),
  header: z.object({
    show: z.boolean(),
    menus: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
    actions: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        variant: z.string().optional(),
      }),
    ),
    language_switcher: z.boolean(),
  }),
  footer: z.object({
    show: z.boolean(),
    company_name: z.string(),
    address: z.string(),
    email: z.string().email(),
    phone: z.string(),
    website_url: z.string().url(),
    copyright: z.string(),
    socials: z.object({
      facebook: z.string().url().optional(),
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    }),
    links: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
  }),
  system: z.object({
    maintenance_mode: z.boolean(),
    timezone: z.string(),
    max_upload_mb: z.number().int().positive(),
  }),
  security: z.object({
    session_timeout_minutes: z.number().int().positive(),
    allow_registration: z.boolean(),
    rate_limit: z.object({
      enabled: z.boolean(),
      requests_per_minute: z.number().int().positive(),
    }),
  }),
  bot_protection: z.object({
    enabled: z.boolean(),
    provider: z.string(),
    site_key: z.string(),
    actions: z.object({
      login: z.boolean(),
      register: z.boolean(),
      forgot_password: z.boolean(),
      contact_form: z.boolean(),
      comment: z.boolean(),
    }),
    threshold: z.object({
      recaptcha_v3_score: z.number().min(0).max(1),
    }),
    fallback: z.object({
      block_on_failure: z.boolean(),
      show_challenge: z.boolean(),
    }),
  }),
  features: z.object({
    dark_mode: z.boolean(),
    public_site: z.boolean(),
    enable_blog: z.boolean(),
  }),
  home: z.object({
    sections_order: z.array(z.string()),
    hero: z.object({
      badge: z.string(),
      headline: z.string(),
      subheadline: z.string(),
      primary_cta: z.object({
        label: z.string(),
        href: z.string(),
      }),
      secondary_cta: z.object({
        label: z.string(),
        href: z.string(),
      }),
      hero_image_url: z.string().url(),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      }),
    ),
    how_it_works: z.object({
      steps: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
    pricing: z.object({
      currency: z.string(),
      storage: z.object({
        price_per_gb: z.number(),
        unit: z.string(),
      }),
      transfer: z.object({
        inbound: z.number(),
        outbound: z.number(),
      }),
      notes: z.array(z.string()),
    }),
    trust: z.object({
      badges: z.array(z.string()),
    }),
    cta: z.object({
      headline: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string(),
      }),
    }),
  }),
});

export type SettingsType = z.infer<typeof settingsSchema>;
