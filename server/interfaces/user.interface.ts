export interface UserI {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
}
 