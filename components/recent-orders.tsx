import { CheckCircle, Clock, CookingPot, ExternalLink, Truck, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type OrderStatus = "Ordered" | "Preparing" | "Dispatched" | "Delivered" | "Canceled"

interface Order {
  id: string
  user: string
  chef: string
  amount: number
  status: OrderStatus
  date: string
}

const recentOrders: Order[] = [
  {
    id: "ORD001",
    user: "John Doe",
    chef: "Chef Rahul",
    amount: 500,
    status: "Delivered",
    date: "10 mins ago",
  },
  {
    id: "ORD002",
    user: "Jane Smith",
    chef: "Chef Priya",
    amount: 750,
    status: "Preparing",
    date: "25 mins ago",
  },
  {
    id: "ORD003",
    user: "Mike Johnson",
    chef: "Chef Amit",
    amount: 850,
    status: "Ordered",
    date: "45 mins ago",
  },
  {
    id: "ORD004",
    user: "Sarah Williams",
    chef: "Chef Deepak",
    amount: 450,
    status: "Dispatched",
    date: "1 hour ago",
  },
  {
    id: "ORD005",
    user: "Robert Chen",
    chef: "Chef Neha",
    amount: 650,
    status: "Canceled",
    date: "2 hours ago",
  },
]

const statusIcon = (status: OrderStatus) => {
  switch (status) {
    case "Ordered":
      return <Clock className="h-4 w-4" />
    case "Preparing":
      return <CookingPot className="h-4 w-4" />
    case "Dispatched":
      return <Truck className="h-4 w-4" />
    case "Delivered":
      return <CheckCircle className="h-4 w-4" />
    case "Canceled":
      return <XCircle className="h-4 w-4" />
  }
}

const statusColor = (status: OrderStatus) => {
  switch (status) {
    case "Ordered":
      return "bg-blue-100 text-blue-800"
    case "Preparing":
      return "bg-yellow-100 text-yellow-800"
    case "Dispatched":
      return "bg-purple-100 text-purple-800"
    case "Delivered":
      return "bg-green-100 text-green-800"
    case "Canceled":
      return "bg-red-100 text-red-800"
  }
}

export function RecentOrders() {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-medium">{order.id}</span>
              <Badge className={`ml-2 ${statusColor(order.status)} border-none`} variant="outline">
                <span className="flex items-center gap-1">
                  {statusIcon(order.status)}
                  {order.status}
                </span>
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              User: {order.user} | Chef: {order.chef}
            </div>
            <div className="text-sm font-medium">
              ₹{order.amount} • {order.date}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Orders
      </Button>
    </div>
  )
}

