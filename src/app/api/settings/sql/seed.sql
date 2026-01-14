INSERT INTO public.settings (key, value)
VALUES
  ('metadata', '{
    "title": "Gemini HR Management",
    "description": "Secure and Transparent HR Management with Blockchain",
    "keywords": ["blockchain", "hr management", "web3", "saas"],
    "site_url": "https://gemini.vn",
    "canonical_url": "https://gemini.vn",
    "favicon_url": "/favicon.ico",
    "robots": {
      "index": true,
      "follow": true
    },
    "og": {
      "title": "Gemini HR Management",
      "description": "Secure and Transparent HR Management with Blockchain",
      "image_url": "https://gemini.vn/og-image.png"
    }
  }'::jsonb),
  ('urls', '{
    "web_url": "https://gemini.vn",
    "app_url": "https://app.gemini.vn",
    "api_base_url": "https://api.gemini.vn"
  }'::jsonb),
  ('appearance', '{
    "site_title": "Gemini HR",
    "logo_url": "https://gemini.vn/logo.svg",
    "primary_color": "#1976d2",
    "secondary_color": "#9c27b0",
    "theme": "light"
  }'::jsonb),
  ('i18n', '{
    "default_locale": "en",
    "supported_locales": ["en", "vi"],
    "fallback_locale": "en"
  }'::jsonb),
  ('header', '{
    "show": true,
    "menus": [
      { "label": "Features", "href": "#features" },
      { "label": "Solutions", "href": "#solutions" },
      { "label": "NFT Storage", "href": "#storage" },
      { "label": "Pricing", "href": "/pricing" },
      { "label": "Developers", "href": "/developers" }
    ],
    "actions": [
      { "label": "Sign In", "href": "/signin", "variant": "outline" },
      { "label": "App", "href": "/app", "variant": "primary" }
    ],
    "language_switcher": true
  }'::jsonb),
  ('footer', '{
    "show": true,
    "company_name": "Gemini Company",
    "address": "123 Nguyễn Trãi, Quận 1, TP.HCM",
    "email": "contact@gemini.vn",
    "phone": "+84 123 456 789",
    "website_url": "https://gemini.vn",
    "copyright": "© 2026 Gemini. All rights reserved.",
    "socials": {
      "facebook": "https://facebook.com/gemini",
      "github": "https://github.com/gemini",
      "linkedin": "https://linkedin.com/company/gemini"
    },
    "links": [
      { "label": "Privacy Policy", "href": "/privacy" },
      { "label": "Terms of Service", "href": "/terms" }
    ]
  }'::jsonb),
  ('system', '{
    "maintenance_mode": false,
    "timezone": "Asia/Ho_Chi_Minh",
    "max_upload_mb": 10
  }'::jsonb),
  ('security', '{
    "session_timeout_minutes": 60,
    "allow_registration": true,
    "rate_limit": {
      "enabled": true,
      "requests_per_minute": 60
    }
  }'::jsonb),
  ('bot_protection', '{
    "enabled": true,
    "provider": "cloudflare_turnstile",
    "site_key": "PUBLIC_SITE_KEY",
    "actions": {
      "login": true,
      "register": true,
      "forgot_password": true,
      "contact_form": true,
      "comment": false
    },
    "threshold": {
      "recaptcha_v3_score": 0.5
    },
    "fallback": {
      "block_on_failure": true,
      "show_challenge": true
    }
  }'::jsonb),
  ('features', '{
    "dark_mode": true,
    "public_site": true,
    "enable_blog": false
  }'::jsonb),
  ('home', '{
    "sections_order": ["hero", "features", "how_it_works", "pricing", "trust", "cta"],
    "hero": {
      "badge": "Blockchain HR Management",
      "headline": "Secure and Transparent HR Management with Blockchain",
      "subheadline": "Our decentralized human resource management platform ensures secure storage, privacy, and transparency without third-party subscriptions.",
      "primary_cta": {
        "label": "Get Started",
        "href": "/app"
      },
      "secondary_cta": {
        "label": "Pricing",
        "href": "/pricing"
      },
      "hero_image_url": "https://gemini.vn/images/dashboard.png"
    },
    "features": [
      {
        "title": "Decentralized Security",
        "description": "HR data is securely stored on blockchain to prevent data breaches and ensure trust.",
        "icon": "shield"
      },
      {
        "title": "Lightweight & Efficient",
        "description": "Optimized for fast performance and smooth collaboration.",
        "icon": "zap"
      },
      {
        "title": "No Hidden Fees",
        "description": "Pay only for what you use with transparent pricing.",
        "icon": "wallet"
      }
    ],
    "how_it_works": {
      "steps": [
        {
          "title": "Create an account",
          "description": "Register and set up your company profile."
        },
        {
          "title": "Store & verify data",
          "description": "Encrypt and store HR data securely on blockchain."
        },
        {
          "title": "Share & manage",
          "description": "Employees control and share their data securely."
        }
      ]
    },
    "pricing": {
      "currency": "USD",
      "storage": {
        "price_per_gb": 0.008,
        "unit": "GB/month"
      },
      "transfer": {
        "inbound": 0.006,
        "outbound": 0.006
      },
      "notes": ["No setup fees", "No monthly subscriptions", "Pay as you go"]
    },
    "trust": {
      "badges": ["GDPR", "Norton", "Stripe", "PayPal"]
    },
    "cta": {
      "headline": "Fast. Secure. Transparent HR Management.",
      "button": {
        "label": "Get Started",
        "href": "/app"
      }
    }
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = timezone('utc'::text, now());
