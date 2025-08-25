import { WebinarAnalytics } from "@/components/webinars/webinar-analytics"

interface PageProps {
  params: {
    id: string
  }
}

export default function WebinarAnalyticsPage({ params }: PageProps) {
  return (
    <div className="p-6">
      <WebinarAnalytics webinarId={params.id} />
    </div>
  )
}
