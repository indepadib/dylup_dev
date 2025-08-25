-- Update workflows table to reference auth.users and add RLS
-- Create workflows table for automation
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- draft, active, paused, archived
  trigger_type VARCHAR(100) NOT NULL, -- signup, purchase, abandoned_cart, date_based, etc.
  trigger_config JSONB DEFAULT '{}',
  steps JSONB DEFAULT '[]', -- Array of workflow steps
  total_enrolled INTEGER DEFAULT 0,
  active_enrolled INTEGER DEFAULT 0,
  completed_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workflow enrollments table
CREATE TABLE IF NOT EXISTS public.workflow_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'active', -- active, completed, stopped
  current_step INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  last_action_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS and create policies
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workflows
CREATE POLICY "workflows_select_own" ON public.workflows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "workflows_insert_own" ON public.workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "workflows_update_own" ON public.workflows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "workflows_delete_own" ON public.workflows
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for workflow enrollments (through workflow ownership)
CREATE POLICY "workflow_enrollments_select_own" ON public.workflow_enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = workflow_enrollments.workflow_id 
      AND workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "workflow_enrollments_insert_own" ON public.workflow_enrollments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = workflow_enrollments.workflow_id 
      AND workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "workflow_enrollments_update_own" ON public.workflow_enrollments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = workflow_enrollments.workflow_id 
      AND workflows.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflow_enrollments_workflow_id ON workflow_enrollments(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_enrollments_contact_id ON workflow_enrollments(contact_id);
