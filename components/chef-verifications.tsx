import { CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChefVerification {
  id: string
  name: string
  kitchenName: string
  documents: {
    fssai: boolean
    gst: boolean
    pan: boolean
    bankDetails: boolean
  }
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

type ChefVerificationProps = {}

const pendingVerifications = [
  {
    id: "CHEF001",
    name: "Chef Rahul",
    kitchenName: "Rahul's Home Kitchen",
    documents: {
      fssai: true,
      gst: true,
      pan: true,
      bankDetails: true,
    },
    status: "pending",
    submittedAt: "2 hours ago",
  },
  {
    id: "CHEF002",
    name: "Chef Priya",
    kitchenName: "Spice Corner",
    documents: {
      fssai: true,
      gst: false,
      pan: true,
      bankDetails: true,
    },
    status: "pending",
    submittedAt: "5 hours ago",
  },
  {
    id: "CHEF003",
    name: "Chef Amit",
    kitchenName: "Traditional Delights",
    documents: {
      fssai: true,
      gst: true,
      pan: true,
      bankDetails: false,
    },
    status: "pending",
    submittedAt: "1 day ago",
  },
]

export function ChefVerifications() {
  return (
    <div className="space-y-4">
      {pendingVerifications.map((chef) => (
        <div key={chef.id} className="flex flex-col border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium">{chef.name}</div>
              <div className="text-sm text-muted-foreground">{chef.kitchenName}</div>
              <div className="text-xs text-muted-foreground">Submitted: {chef.submittedAt}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`rounded-full p-1 ${chef.documents.fssai ? "bg-green-100" : "bg-red-100"}`}>
                    {chef.documents.fssai ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>FSSAI License</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`rounded-full p-1 ${chef.documents.gst ? "bg-green-100" : "bg-red-100"}`}>
                    {chef.documents.gst ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GST Number</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`rounded-full p-1 ${chef.documents.pan ? "bg-green-100" : "bg-red-100"}`}>
                    {chef.documents.pan ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>PAN Card</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`rounded-full p-1 ${chef.documents.bankDetails ? "bg-green-100" : "bg-red-100"}`}>
                    {chef.documents.bankDetails ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bank Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              Approve
            </Button>
            <Button variant="outline" size="sm" className="h-7 bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
              Reject
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Verifications
      </Button>
    </div>
  )
}

