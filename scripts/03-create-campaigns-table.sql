-- Update campaigns table to reference auth.users and add RLS
-- Create campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- email, sms, push
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, sending, sent, paused
  subject VARCHAR(500),
  content TEXT,
  template_id UUID,
  audience_ids UUID[] DEFAULT '{}',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  total_recipients INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  unsubscribed_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create campaign analytics table
CREATE TABLE IF NOT EXISTS public.campaign_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- sent, delivered, opened, clicked, unsubscribed, bounced
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaigns
CREATE POLICY "campaigns_select_own" ON public.campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "campaigns_insert_own" ON public.campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "campaigns_update_own" ON public.campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "campaigns_delete_own" ON public.campaigns
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for campaign analytics (through campaign ownership)
CREATE POLICY "campaign_analytics_select_own" ON public.campaign_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_analytics.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "campaign_analytics_insert_own" ON public.campaign_analytics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_analytics.campaign_id 
      AND campaigns.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_campaign_id ON campaign_analytics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_event_type ON campaign_analytics(event_type);
