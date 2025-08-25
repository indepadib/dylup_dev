-- Update audiences table to reference auth.users and add RLS
-- Create audiences table for contact management
CREATE TABLE IF NOT EXISTS public.audiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  tags TEXT[], -- Array of tags
  total_contacts INTEGER DEFAULT 0,
  active_contacts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audience_id UUID NOT NULL REFERENCES audiences(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  company VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, unsubscribed, bounced
  tags TEXT[],
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE public.audiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audiences
CREATE POLICY "audiences_select_own" ON public.audiences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "audiences_insert_own" ON public.audiences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "audiences_update_own" ON public.audiences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "audiences_delete_own" ON public.audiences
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for contacts (through audience ownership)
CREATE POLICY "contacts_select_own" ON public.contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM audiences 
      WHERE audiences.id = contacts.audience_id 
      AND audiences.user_id = auth.uid()
    )
  );

CREATE POLICY "contacts_insert_own" ON public.contacts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM audiences 
      WHERE audiences.id = contacts.audience_id 
      AND audiences.user_id = auth.uid()
    )
  );

CREATE POLICY "contacts_update_own" ON public.contacts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM audiences 
      WHERE audiences.id = contacts.audience_id 
      AND audiences.user_id = auth.uid()
    )
  );

CREATE POLICY "contacts_delete_own" ON public.contacts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM audiences 
      WHERE audiences.id = contacts.audience_id 
      AND audiences.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_audiences_user_id ON audiences(user_id);
CREATE INDEX IF NOT EXISTS idx_contacts_audience_id ON contacts(audience_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
