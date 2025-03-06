"use client"

import { useState } from "react"
import { MoreHorizontal, Search, Filter, Download, RefreshCw, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Complaint {
  id: string
  userId: string
  userName: string
  userEmail: string
  subject: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  submittedAt: string
  resolvedAt?: string
  category: string
}

const complaints: Complaint[] = [
  {
    id: "COMP001",
    userId: "USER001",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    subject: "Wrong Order Delivered",
    description: "I received a different dish than what I ordered.",
    status: "resolved",
    priority: "high",
    submittedAt: "Jan 15, 2024",
    resolvedAt: "Jan 16, 2024",
    category: "Order Issue",
  },
  {
    id: "COMP002",
    userId: "USER003",
    userName: "Michael Johnson",
    userEmail: "michael.j@example.com",
    subject: "Late Delivery",
    description: "My order was delivered 1 hour later than the estimated time.",
    status: "open",
    priority: "medium",
    submittedAt: "Jan 18, 2024",
    category: "Delivery Issue",
  },
  {
    id: "COMP003",
    userId: "USER004",
    userName: "Priya Sharma",
    userEmail: "priya.s@example.com",
    subject: "Quality Concern",
    description: "The food quality was not up to the usual standards.",
    status: "in-progress",
    priority: "high",
    submittedAt: "Jan 19, 2024",
    category: "Food Quality",
  },
  {
    id: "COMP004",
    userId: "USER002",
    userName: "Sarah Smith",
    userEmail: "sarah.smith@example.com",
    subject: "App Technical Issue",
    description: "Unable to modify my order after placing it.",
    status: "closed",
    priority: "low",
    submittedAt: "Jan 20, 2024",
    resolvedAt: "Jan 21, 2024",
    category: "Technical Issue",
  },
]

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: Complaint["status"]) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPriorityColor = (priority: Complaint["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "medium":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Complaints</h2>
        <Button>Add Complaint</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search complaints..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Select defaultValue="10">
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{complaint.userName}</span>
                    <span className="text-xs text-muted-foreground">{complaint.userEmail}</span>
                  </div>
                </TableCell>
                <TableCell>{complaint.subject}</TableCell>
                <TableCell>
                  <Badge variant="outline">{complaint.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(complaint.status)}>
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getPriorityColor(complaint.priority)}>
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{complaint.submittedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedComplaint(complaint)
                          setViewDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedComplaint(complaint)
                          setEditDialogOpen(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedComplaint(complaint)
                          setDeleteDialogOpen(true)
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Complaint Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>Detailed information about the selected complaint.</DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Complaint ID</p>
                  <p className="text-sm">{selectedComplaint.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Category</p>
                  <Badge variant="outline">{selectedComplaint.category}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant="secondary" className={getStatusColor(selectedComplaint.status)}>
                    {selectedComplaint.status.charAt(0).toUpperCase() + selectedComplaint.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Priority</p>
                  <Badge variant="secondary" className={getPriorityColor(selectedComplaint.priority)}>
                    {selectedComplaint.priority.charAt(0).toUpperCase() + selectedComplaint.priority.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">User Information</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={selectedComplaint.userName} />
                    <AvatarFallback>{selectedComplaint.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{selectedComplaint.userName}</span>
                    <span className="text-xs text-muted-foreground">{selectedComplaint.userEmail}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Subject</p>
                <p className="text-sm">{selectedComplaint.subject}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm">{selectedComplaint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Submitted On</p>
                  <p className="text-sm">{selectedComplaint.submittedAt}</p>
                </div>
                {selectedComplaint.resolvedAt && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Resolved On</p>
                    <p className="text-sm">{selectedComplaint.resolvedAt}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Complaint Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Complaint</DialogTitle>
            <DialogDescription>Update complaint information</DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedComplaint.status}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select defaultValue={selectedComplaint.priority}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select defaultValue={selectedComplaint.category}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Order Issue">Order Issue</SelectItem>
                    <SelectItem value="Delivery Issue">Delivery Issue</SelectItem>
                    <SelectItem value="Food Quality">Food Quality</SelectItem>
                    <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resolution" className="text-right">
                  Resolution Notes
                </Label>
                <Textarea
                  id="resolution"
                  placeholder="Add resolution notes"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Complaint Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this complaint? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="py-4">
              <p className="text-center font-semibold">
                {selectedComplaint.id} - {selectedComplaint.subject}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete Complaint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}