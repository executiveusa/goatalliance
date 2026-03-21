-- ============================================================
-- GOAT ALLIANCE MVP — Database Setup
-- Compatible with: PostgreSQL (Supabase) + SQLite (dev)
--
-- Run against Supabase:
--   psql postgresql://postgres:***@31.220.58.212:5434/second_brain < scripts/setup-database.sql
--
-- Tables: businesses, contacts, appointments, analytics_events, magic_tokens
-- Indexes optimized for: Seattle local services directory
-- ============================================================

-- Enable pgvector for semantic search (Supabase only)
-- CREATE EXTENSION IF NOT EXISTS vector;

-- ── Businesses ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS businesses (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  owner_name    TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  website       TEXT,
  city          TEXT NOT NULL DEFAULT 'Seattle',
  state         TEXT NOT NULL DEFAULT 'WA',
  niche         TEXT NOT NULL DEFAULT 'general',
  avatar_config JSONB NOT NULL DEFAULT '{}',
  plan          TEXT NOT NULL DEFAULT 'starter',
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Contacts / Leads ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  business_id   TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  address       TEXT,
  city          TEXT NOT NULL DEFAULT 'Seattle',
  state         TEXT NOT NULL DEFAULT 'WA',
  status        TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW','ACTIVE','INACTIVE','VIP')),
  source        TEXT NOT NULL DEFAULT 'WEBSITE' CHECK (source IN ('FACEBOOK','GOOGLE','REFERRAL','WEBSITE','WHATSAPP','PHONE','OTHER')),
  tags          JSONB NOT NULL DEFAULT '[]',
  notes         TEXT,
  total_revenue DECIMAL(10,2) NOT NULL DEFAULT 0,
  job_count     INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_business ON contacts(business_id);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_source ON contacts(source);
CREATE INDEX IF NOT EXISTS idx_contacts_search ON contacts USING GIN (to_tsvector('english', name || ' ' || COALESCE(phone,'') || ' ' || COALESCE(email,'')));

-- ── Appointments ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
  id             TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  business_id    TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  contact_id     TEXT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  service        TEXT NOT NULL DEFAULT 'General Service',
  scheduled_at   TIMESTAMPTZ NOT NULL,
  duration       INTEGER NOT NULL DEFAULT 60,
  status         TEXT NOT NULL DEFAULT 'SCHEDULED' CHECK (status IN ('SCHEDULED','CONFIRMED','COMPLETED','CANCELLED','NO_SHOW')),
  notes          TEXT,
  price          DECIMAL(10,2),
  reminder_sent  BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_business ON appointments(business_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled ON appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_upcoming ON appointments(business_id, scheduled_at) WHERE status NOT IN ('COMPLETED','CANCELLED','NO_SHOW');

-- ── Analytics Events ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics_events (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  business_id TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  event_type  TEXT NOT NULL,  -- lead_received, appointment_booked, job_completed, revenue_recorded
  source      TEXT,           -- facebook, google, referral, etc.
  value       DECIMAL(10,2) NOT NULL DEFAULT 0,
  metadata    JSONB NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_business ON analytics_events(business_id);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_events(business_id, created_at DESC);

-- ── Magic Tokens (passwordless auth) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS magic_tokens (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  business_id TEXT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  token       TEXT NOT NULL UNIQUE,
  phone       TEXT,
  email       TEXT,
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_magic_tokens_token ON magic_tokens(token);
CREATE INDEX IF NOT EXISTS idx_magic_tokens_expires ON magic_tokens(expires_at);

-- ── Updated_at triggers ───────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER businesses_updated_at BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TRIGGER appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Seed: Demo Business ───────────────────────────────────────────────────────
INSERT INTO businesses (id, name, slug, owner_name, phone, email, city, state, niche, plan)
VALUES (
  'demo-biz',
  'Seattle Pro Painters',
  'demo-biz',
  'Mike Johnson',
  '+1 (206) 555-0100',
  'mike@seattleopro.com',
  'Seattle',
  'WA',
  'painter',
  'pro'
) ON CONFLICT (id) DO NOTHING;

-- ── Seed: Demo Contacts ───────────────────────────────────────────────────────
INSERT INTO contacts (business_id, name, phone, email, source, status, total_revenue, job_count) VALUES
  ('demo-biz', 'James Rodriguez', '+1 (206) 555-0142', 'james@email.com', 'FACEBOOK', 'ACTIVE', 2400, 3),
  ('demo-biz', 'Sarah Kim', '+1 (206) 555-0198', 'sarah@email.com', 'GOOGLE', 'VIP', 8700, 9),
  ('demo-biz', 'Marcus Chen', '+1 (206) 555-0231', null, 'REFERRAL', 'NEW', 0, 0),
  ('demo-biz', 'Emily Torres', '+1 (206) 555-0177', 'emily.t@gmail.com', 'WEBSITE', 'ACTIVE', 1800, 2),
  ('demo-biz', 'Tom Park', '+1 (206) 555-0089', 'tom.park@email.com', 'FACEBOOK', 'VIP', 12400, 14)
ON CONFLICT (id) DO NOTHING;

-- ── Analytics: seed some events ───────────────────────────────────────────────
INSERT INTO analytics_events (business_id, event_type, source, value) VALUES
  ('demo-biz', 'lead_received', 'FACEBOOK', 0),
  ('demo-biz', 'lead_received', 'GOOGLE', 0),
  ('demo-biz', 'lead_received', 'REFERRAL', 0),
  ('demo-biz', 'appointment_booked', null, 1800),
  ('demo-biz', 'revenue_recorded', null, 1800),
  ('demo-biz', 'lead_received', 'FACEBOOK', 0),
  ('demo-biz', 'appointment_booked', null, 2400),
  ('demo-biz', 'revenue_recorded', null, 2400)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Schema complete. Goat Alliance MVP is ready.
-- Run: psql $DATABASE_URL < scripts/setup-database.sql
-- ============================================================
