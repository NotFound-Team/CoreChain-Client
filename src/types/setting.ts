export type TSystemSettings = {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    site_url: string;
    canonical_url: string;
    favicon_url: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
    og: {
      title: string;
      description: string;
      image_url: string;
    };
  };

  urls: {
    web_url: string;
    app_url: string;
    api_base_url: string;
  };

  appearance: {
    site_title: string;
    logo_url: string;
    primary_color: string;
    secondary_color: string;
    theme: "light" | "dark" | "system";
  };

  i18n: {
    default_locale: string;
    supported_locales: string[];
    fallback_locale: string;
  };

  header: {
    show: boolean;
    menus: { label: string; href: string }[];
    actions: { label: string; href: string; variant: "primary" | "outline" }[];
    language_switcher: boolean;
  };

  footer: {
    show: boolean;
    company_name: string;
    address: string;
    email: string;
    phone: string;
    website_url: string;
    copyright: string;
    socials: Record<string, string>;
    links: { label: string; href: string }[];
  };

  system: {
    maintenance_mode: boolean;
    timezone: string;
    max_upload_mb: number;
  };

  security: {
    session_timeout_minutes: number;
    allow_registration: boolean;
    rate_limit: {
      enabled: boolean;
      requests_per_minute: number;
    };
  };

  bot_protection: {
    enabled: boolean;
    provider: "cloudflare_turnstile" | "google_recaptcha_v2" | "google_recaptcha_v3" | "hcaptcha";
    site_key: string;
    actions: Record<string, boolean>;
    threshold?: {
      recaptcha_v3_score?: number;
    };
    fallback: {
      block_on_failure: boolean;
      show_challenge: boolean;
    };
  };

  features: Record<string, boolean>;

  home: {
    sections_order: string[];

    hero: {
      badge: string;
      headline: string;
      subheadline: string;
      primary_cta: { label: string; href: string };
      secondary_cta: { label: string; href: string };
      hero_image_url: string;
    };

    features: {
      title: string;
      description: string;
      icon: string;
    }[];

    how_it_works: {
      steps: { title: string; description: string }[];
    };

    pricing: {
      currency: string;
      storage: { price_per_gb: number; unit: string };
      transfer: { inbound: number; outbound: number };
      notes: string[];
    };

    trust: {
      badges: string[];
    };

    cta: {
      headline: string;
      button: { label: string; href: string };
    };
  };
};
