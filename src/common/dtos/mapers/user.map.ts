import { Types } from "mongoose";
import { RoleMap } from "./role.map";

interface UserProps {
  _id: Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  role: any;
}

export class UserMap {
  constructor(userProps: UserProps) {
    this.id = userProps._id.toString();
    this.name = userProps.name;
    this.lastName = userProps.lastName;
    this.email = userProps.email;
    this.role = new RoleMap(userProps.role);
  }
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: RoleMap;
}

export interface UserDetailProps extends UserProps {
  phone?: string | null;
  location?: string | null;
  createdAt: Date;
}

export class UserDetailMap extends UserMap {
  constructor(userDetailProps: UserDetailProps) {
    const { phone, location, createdAt, ...rest } = userDetailProps;
    super(rest);
    this.phone = phone || "";
    this.location = location || "";
    this.createdAt = createdAt;
  }
  phone: string;
  location: string;
  createdAt: Date;
}

export interface UserSystemProps extends UserDetailProps {
  password: string;
}

export class UserSystemMap extends UserDetailMap {
  constructor(userSystemProps: UserSystemProps) {
    const { password, ...rest } = userSystemProps;
    super(rest);
    this.password = password;
  }
  password: string;
}
