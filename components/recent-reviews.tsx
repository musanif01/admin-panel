import { Star, Check, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  userId: string
  userName: string
  userInitial: string
  chefId: string
  chefName: string
  dishId: string
  dishName: string
  rating: number
  text: string
  date: string
}

const reviews: Review[] = [
  {
    id: "REV001",
    userId: "USER001",
    userName: "John Doe",
    userInitial: "J",
    chefId: "CHEF001",
    chefName: "Chef Rahul",
    dishId: "DISH001",
    dishName: "Paneer Butter Masala",
    rating: 4.5,
    text: "Amazing food! The paneer was so soft and the gravy was flavorful. Highly recommend.",
    date: "30 mins ago",
  },
  {
    id: "REV002",
    userId: "USER002",
    userName: "Sarah Smith",
    userInitial: "S",
    chefId: "CHEF002",
    chefName: "Chef Priya",
    dishId: "DISH002",
    dishName: "Veg Biryani",
    rating: 3.5,
    text: "Good flavor but rice was a bit undercooked. Would try again though.",
    date: "2 hours ago",
  },
  {
    id: "REV003",
    userId: "USER003",
    userName: "Mike Chen",
    userInitial: "M",
    chefId: "CHEF003",
    chefName: "Chef Amit",
    dishId: "DISH003",
    dishName: "Butter Chicken",
    rating: 5.0,
    text: "Best butter chicken I've ever had! Perfectly spiced and the chicken was so tender.",
    date: "4 hours ago",
  },
]

const renderStars = (rating: number) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)
  }

  if (halfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-3 w-3 text-yellow-400" />
        <div className="absolute top-0 left-0 w-[50%] overflow-hidden">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        </div>
      </div>,
    )
  }

  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-3 w-3 text-yellow-400" />)
  }

  return stars
}

export function RecentReviews() {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={review.userName} />
                <AvatarFallback>{review.userInitial}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{review.userName}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  On {review.dishName} by {review.chefName}
                </p>
                <p className="text-sm">{review.text}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              className="h-7 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              <Check className="mr-1 h-4 w-4" /> Approve
            </Button>
            <Button size="sm" variant="outline" className="h-7 bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
              <X className="mr-1 h-4 w-4" /> Reject
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Reviews
      </Button>
    </div>
  )
}

