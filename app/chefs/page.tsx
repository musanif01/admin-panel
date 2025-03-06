"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Shield,
  Star,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Checkbox } from "@/components/ui/checkbox"

interface Chef {
  id: string
  name: string
  email: string
  phone: string
  kitchenName: string
  location: string
  businessHours: string
  verifiedStatus: boolean
  totalSales: number
  ratings: number
  joinedOn: string
}

const chefs: Chef[] = [
  {
    id: "CHEF001",
    name: "Chef Rahul",
    email: "rahul.chef@example.com",
    phone: "+91987654321",
    kitchenName: "Rahul's Home Kitchen",
    location: "Indore, MP",
    businessHours: "9 AM - 10 PM",
    verifiedStatus: true,
    totalSales: 560,
    ratings: 4.8,
    joinedOn: "Jan 5, 2023",
  },
  {
    id: "CHEF002",
    name: "Chef Priya",
    email: "priya.chef@example.com",
    phone: "+91876543210",
    kitchenName: "Spice Corner",
    location: "Bhopal, MP",
    businessHours: "10 AM - 8 PM",
    verifiedStatus: true,
    totalSales: 420,
    ratings: 4.6,
    joinedOn: "Feb 17, 2023",
  },
  {
    id: "CHEF003",
    name: "Chef Amit",
    email: "amit.chef@example.com",
    phone: "+91765432109",
    kitchenName: "Traditional Delights",
    location: "Indore, MP",
    businessHours: "8 AM - 9 PM",
    verifiedStatus: false,
    totalSales: 180,
    ratings: 4.2,
    joinedOn: "Mar 12, 2023",
  },
  {
    id: "CHEF004",
    name: "Chef Deepak",
    email: "deepak.chef@example.com",
    phone: "+91654321098",
    kitchenName: "Punjabi Tadka",
    location: "Gwalior, MP",
    businessHours: "9 AM - 11 PM",
    verifiedStatus: true,
    totalSales: 630,
    ratings: 4.9,
    joinedOn: "Apr 3, 2023",
  },
  {
    id: "CHEF005",
    name: "Chef Neha",
    email: "neha.chef@example.com",
    phone: "+91543210987",
    kitchenName: "Neha's Fusion Kitchen",
    location: "Indore, MP",
    businessHours: "10 AM - 9 PM",
    verifiedStatus: true,
    totalSales: 380,
    ratings: 4.5,
    joinedOn: "May 20, 2023",
  },
  {
    id: "CHEF006",
    name: "Chef Vikram",
    email: "vikram.chef@example.com",
    phone: "+91432109876",
    kitchenName: "South Indian Specials",
    location: "Jabalpur, MP",
    businessHours: "7 AM - 8 PM",
    verifiedStatus: false,
    totalSales: 90,
    ratings: 4.0,
    joinedOn: "Jun 15, 2023",
  },
]

export default function ChefsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const filteredChefs = chefs.filter(
    (chef) =>
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.kitchenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Chefs</h2>
        <Button>Add Chef</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Chefs</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search chefs..."
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
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Chef</TableHead>
                  <TableHead>Kitchen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChefs.map((chef) => (
                  <TableRow key={chef.id}>
                    <TableCell className="font-medium">{chef.id.slice(-3)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={`/placeholder.svg?height=28&width=28`} alt={chef.name} />
                          <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{chef.name}</span>
                          <span className="text-xs text-muted-foreground">{chef.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{chef.kitchenName}</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" /> {chef.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {chef.verifiedStatus ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit">
                          <Shield className="h-3 w-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-800 flex items-center gap-1 w-fit">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>₹{chef.totalSales.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {chef.ratings}
                      </div>
                    </TableCell>
                    <TableCell>{chef.joinedOn}</TableCell>
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
                              setSelectedChef(chef)
                              setViewDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedChef(chef)
                              setEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit Chef
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedChef(chef)
                              setDeleteDialogOpen(true)
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Chef
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Chef</TableHead>
                  <TableHead>Kitchen</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chefs
                  .filter((chef) => chef.verifiedStatus)
                  .map((chef) => (
                    <TableRow key={chef.id}>
                      <TableCell className="font-medium">{chef.id.slice(-3)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={`/placeholder.svg?height=28&width=28`} alt={chef.name} />
                            <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{chef.name}</span>
                            <span className="text-xs text-muted-foreground">{chef.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{chef.kitchenName}</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" /> {chef.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>₹{chef.totalSales.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {chef.ratings}
                        </div>
                      </TableCell>
                      <TableCell>{chef.joinedOn}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Chef</TableHead>
                  <TableHead>Kitchen</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chefs
                  .filter((chef) => !chef.verifiedStatus)
                  .map((chef) => (
                    <TableRow key={chef.id}>
                      <TableCell className="font-medium">{chef.id.slice(-3)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={`/placeholder.svg?height=28&width=28`} alt={chef.name} />
                            <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{chef.name}</span>
                            <span className="text-xs text-muted-foreground">{chef.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{chef.kitchenName}</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" /> {chef.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-800">
                          4 Pending Review
                        </Badge>
                      </TableCell>
                      <TableCell>{chef.joinedOn}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* View Chef Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Chef Details</DialogTitle>
            <DialogDescription>Detailed information about the selected chef.</DialogDescription>
          </DialogHeader>
          {selectedChef && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={selectedChef.name} />
                  <AvatarFallback>{selectedChef.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-semibold">{selectedChef.name}</h4>
                  <p className="text-sm text-muted-foreground">ID: {selectedChef.id}</p>
                  <div className="flex items-center mt-1">
                    {selectedChef.verifiedStatus ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1 w-fit">
                        <Shield className="h-3 w-3" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-800 flex items-center gap-1 w-fit">
                        Pending Verification
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{selectedChef.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">{selectedChef.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Kitchen Name</p>
                  <p className="text-sm">{selectedChef.kitchenName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {selectedChef.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Business Hours</p>
                  <p className="text-sm flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {selectedChef.businessHours}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Joined On</p>
                  <p className="text-sm">{selectedChef.joinedOn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Sales</p>
                  <p className="text-sm">₹{selectedChef.totalSales.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Rating</p>
                  <p className="text-sm flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {selectedChef.ratings} / 5.0
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Documents</h5>
                <div className="grid grid-cols-4 gap-2">
                  <div className="border rounded p-3 text-center">
                    <p className="text-sm font-medium">FSSAI License</p>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      View
                    </Button>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <p className="text-sm font-medium">GST Number</p>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      View
                    </Button>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <p className="text-sm font-medium">PAN Card</p>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      View
                    </Button>
                  </div>
                  <div className="border rounded p-3 text-center">
                    <p className="text-sm font-medium">Bank Details</p>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chef Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Chef</DialogTitle>
            <DialogDescription>Update chef information</DialogDescription>
          </DialogHeader>
          {selectedChef && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue={selectedChef.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" defaultValue={selectedChef.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" defaultValue={selectedChef.phone} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kitchenName" className="text-right">
                  Kitchen Name
                </Label>
                <Input id="kitchenName" defaultValue={selectedChef.kitchenName} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input id="location" defaultValue={selectedChef.location} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="businessHours" className="text-right">
                  Business Hours
                </Label>
                <Input id="businessHours" defaultValue={selectedChef.businessHours} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Checkbox id="verifiedStatus" defaultChecked={selectedChef.verifiedStatus} />
                  <Label htmlFor="verifiedStatus">Verified</Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" placeholder="Add notes about this chef" className="col-span-3" />
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

      {/* Delete Chef Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chef? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedChef && (
            <div className="py-4">
              <p className="text-center font-semibold">
                {selectedChef.name} ({selectedChef.id})
              </p>
              <p className="text-center text-sm text-muted-foreground">{selectedChef.kitchenName}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(false)}>
              Delete Chef
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

