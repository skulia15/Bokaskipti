import { ObjectId } from "mongoose"

// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

// Interface to define our Todo model on the frontend
export interface Todo {
  _id?: ObjectId
  item: string
  completed: boolean
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  wishList: ObjectId[]; // Array of book _id references
  joined: Date;
}
