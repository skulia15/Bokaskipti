# Bokaskipti
A Platform for Book Lovers to Exchange Books

I am creating a page for swapping books. 
I need you to help me to create a DB Schema. 
I will need to account for Book, User, Books that the user has, book genres, book authors, 

## Requirements:
User registration and login with oauth2
  Store user id's in DB
Profile page
  List of books they own
  Allow users to create personal profiles with their basic information, preferences, and book collection.
Search functionality
  Implement a search feature that allows users to find books based on titles, authors, genres. This will make it easier for users to find and discover new books to swap.
Book Swap register book listing
  Enable users to create listings for books they wish to swap, complete with book information, condition, and a brief description. 
  This will help users to browse and find books that interest them.
  Book properties: 
    Title, 
    Author, 
    Genre, 
    Condition rating  'Like New', 'Good', 'Fair', or 'Poor',
Swap Request
  Swap Requests and Confirmation: Design a simple process for users to initiate and confirm book swaps, with features such as swap requests, acceptances, and cancellations.
Request book:
  Enables users to add a listing in Book Requests tab. Enables other users to check if books they own are desired.

Additional features
  Private messaging:
    Offer a private messaging system for users to communicate directly about book swaps, exchange shipping information, and ask questions.
  User Reviews and Ratings:
    Allow users to rate and review each other based on their swapping experiences. 
    This will help build trust within the community and encourage responsible behavior.
  Wish list:
     Enable users to create and manage a wish list of books they would like to swap in the future. 
     This will help them keep track of desired titles and simplify the swapping process.
  Notifications: 
    Implement a notification system to inform users about new messages, swap requests, or updates to their wish list. This will keep users engaged and aware of any relevant activity on the platform.
  Social Sharing and Integration: 
    Incorporate social sharing buttons to allow users to share their book listings, wish lists, or swaps with friends on social media platforms. 
    This will help promote your page and increase user engagement.
  Help Center and FAQ: 
    Create a dedicated section to address frequently asked questions and provide support for users. 
    This will help users navigate the platform and troubleshoot any issues they may encounter.
  User Dashboard:
    Provide a personalized user dashboard that allows users to view their active swaps, past swaps, wish lists, and notifications in one place.

## Non Functional Requirements:
Mobile Responsiveness


Description
Welcome to StorySwap, the ultimate destination for book enthusiasts seeking to share their love of reading and discover new literary adventures! Our platform connects readers from all over, making it easy to swap books you've enjoyed for fresh stories waiting to be explored.

Here at StorySwap, we believe that every book deserves a second chance to spark joy and ignite imaginations. Our user-friendly platform allows you to create a personal profile, list the books you'd like to swap, and search for titles based on your preferences. With our extensive collection of genres and authors, you're bound to find the perfect next read.

## DB Schema
USERS
{
    _id: ObjectId,
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    wishList: [ObjectId], // Array of book _id references
    joined: Date
}
BOOKS
{
    _id: ObjectId,
    title: String,
    author: String,
    genre: String,
    description: String,
    condition: String, // e.g., 'Like New', 'Good', 'Fair', 'Poor'
    coverImageUrl: String,
    owner: ObjectId, // Reference to User _id
    isAvailable: Boolean
}
SWAPS
{
    _id: ObjectId,
    requester: ObjectId, // Reference to User _id
    requestee: ObjectId, // Reference to User _id
    bookRequested: ObjectId, // Reference to Book _id
    bookOffered: ObjectId, // Reference to Book _id
    publicBookRequest_id, // If requested through public book request
    status: String, // e.g., 'Pending', 'Accepted', 'Rejected', 'Cancelled', 'Completed'
    requestDate: Date,
    responseDate: Date,
    completionDate: Date,
    shippingInfo: {
        requester: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        },
        requestee: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }
    }
}

publicBookRequests: {
    _id: ObjectId,
    requester: ObjectId, // Reference to User _id
    title: String,
    author: String,
    genre: String,
    description: String, // Optional, to provide more context for the requested book
    requestDate: Date,
    status: String // e.g., 'Open', 'Fulfilled', 'Cancelled'
}

REVIEWS
{
    _id: ObjectId,
    reviewer: ObjectId, // Reference to User _id
    reviewee: ObjectId, // Reference to User _id
    swap: ObjectId, // Reference to Swap _id
    rating: Number, // e.g., 1-5
    comment: String,
    reviewDate: Date
}

MESSAGES
{
    _id: ObjectId,
    sender: ObjectId, // Reference to User _id
    recipient: ObjectId, // Reference to User _id
    content: String,
    sentDate: Date,
    isRead: Boolean
}



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
