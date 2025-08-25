import { EmailEditor } from "@/components/campaigns/email-editor"

interface PageProps {
  params: {
    id: string
  }
}

export default function CampaignEditorPage({ params }: PageProps) {
  return (
    <div className="p-6">
      <EmailEditor campaignId={params.id} />
    </div>
  )
}
