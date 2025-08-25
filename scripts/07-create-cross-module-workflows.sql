-- Create cross-module workflow tracking table
CREATE TABLE IF NOT EXISTS public.cross_module_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  modules TEXT[] DEFAULT '{}', -- Array of involved modules
  workflow_config JSONB DEFAULT '{}', -- Complete workflow configuration
  total_executions INTEGER DEFAULT 0,
  successful_executions INTEGER DEFAULT 0,
  failed_executions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cross-module execution log
CREATE TABLE IF NOT EXISTS public.cross_module_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES cross_module_workflows(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  execution_data JSONB DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'running', -- running, completed, failed, paused
  current_step INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.cross_module_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cross_module_executions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "cross_module_workflows_select_own" ON public.cross_module_workflows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "cross_module_workflows_insert_own" ON public.cross_module_workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "cross_module_workflows_update_own" ON public.cross_module_workflows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "cross_module_workflows_delete_own" ON public.cross_module_workflows
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "cross_module_executions_select_own" ON public.cross_module_executions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM cross_module_workflows 
      WHERE cross_module_workflows.id = cross_module_executions.workflow_id 
      AND cross_module_workflows.user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_cross_module_workflows_user_id ON cross_module_workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_cross_module_workflows_status ON cross_module_workflows(status);
CREATE INDEX IF NOT EXISTS idx_cross_module_executions_workflow_id ON cross_module_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_cross_module_executions_status ON cross_module_executions(status);
