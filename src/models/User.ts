
export interface User {
  _id: ObjectId;
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
