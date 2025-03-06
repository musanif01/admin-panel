"use client"

import { useState } from "react"
import { MoreHorizontal, Search, Filter, Download, RefreshCw, Eye, XCircle, CookingPot, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type OrderStatus = "Ordered" | "Preparing" | "Dispatched" | "Delivered" | "Canceled"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  userId: string
  userName: string
  chefId: string
  chefName: string
  items: OrderItem[]
  totalPrice: number
  status: OrderStatus
  orderTimestamp: string
  deliveryAddress: string
  paymentMethod: string
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded"
}

const orders: Order[] = [
  {
    id: "ORD001",
    userId: "USER001",
    userName: "John Doe",
    chefId: "CHEF001",
    chefName: "Chef Rahul",
    items: [
      { name: "Paneer Butter Masala", quantity: 2, price: 250 },
      { name: "Naan", quantity: 4, price: 40 },
    ],
    totalPrice: 660,
    status: "Delivered",
    orderTimestamp: "Today, 10:30 AM",
    deliveryAddress: "123 Main Street, Indore",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
  },
  {
    id: "ORD002",
    userId: "USER002",
    userName: "Sarah Smith",
    chefId: "CHEF002",
    chefName: "Chef Priya",
    items: [
      { name: "Veg Biryani", quantity: 1, price: 180 },
      { name: "Raita", quantity: 1, price: 40 },
    ],
    totalPrice: 220,
    status: "Preparing",
    orderTimestamp: "Today, 11:45 AM",
    deliveryAddress: "456 Park Avenue, Indore",
    paymentMethod: "Card",
    paymentStatus: "Paid",
  },
  {
    id: "ORD003",
    userId: "USER003",
    userName: "Michael Johnson",
    chefId: "CHEF003",
    chefName: "Chef Amit",
    items: [
      { name: "Butter Chicken", quantity: 1, price: 300 },
      { name: "Jeera Rice", quantity: 1, price: 120 },
      { name: "Roti", quantity: 2, price: 20 },
    ],
    totalPrice: 460,
    status: "Ordered",
    orderTimestamp: "Today, 12:10 PM",
    deliveryAddress: "789 River Road, Indore",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
  },
  {
    id: "ORD004",
    userId: "USER004",
    userName: "Priya Sharma",
    chefId: "CHEF004",
    chefName: "Chef Deepak",
    items: [
      { name: "Chole Bhature", quantity: 2, price: 160 },
      { name: "Lassi", quantity: 2, price: 80 },
    ],
    totalPrice: 240,
    status: "Dispatched",
    orderTimestamp: "Today, 1:00 PM",
    deliveryAddress: "1011 Oak Street, Indore",
    paymentMethod: "PhonePe",
    paymentStatus: "Paid",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null)

  const filteredOrders = orders.filter((order) => {
    return (
      (order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.chefName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedStatus || order.status === selectedStatus)
    )
  })

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="ghost" className="ml-2">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="ml-2">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="ml-2">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedStatus(null)}>All</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedStatus("Ordered")}>Ordered</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Preparing")}>Preparing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Dispatched")}>Dispatched</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Delivered")}>Delivered</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("Canceled")}>Canceled</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Chef</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ordered At</TableCell>
            <TableCell>Delivery Address</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userName}</TableCell>
              <TableCell>{order.chefName}</TableCell>
              <TableCell>
                {order.items.map((item) => (
                  <div key={item.name}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  variant={
                    order.status === "Delivered" ? "success" : order.status === "Canceled" ? "destructive" : "primary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.orderTimestamp}</TableCell>
              <TableCell>{order.deliveryAddress}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                <Badge
                  className="capitalize"
                  variant={
                    order.paymentStatus === "Paid"
                      ? "success"
                      : order.paymentStatus === "Refunded"
                        ? "secondary"
                        : "primary"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    {order.status === "Ordered" && (
                      <DropdownMenuItem>
                        <CookingPot className="h-4 w-4 mr-2" />
                        Start Preparing
                      </DropdownMenuItem>
                    )}
                    {order.status === "Preparing" && (
                      <DropdownMenuItem>
                        <Truck className="h-4 w-4 mr-2" />
                        Dispatch Order
                      </DropdownMenuItem>
                    )}
                    {order.status !== "Delivered" && order.status !== "Canceled" && (
                      <DropdownMenuItem>
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Order
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

