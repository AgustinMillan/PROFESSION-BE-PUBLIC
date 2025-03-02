import { Types } from "mongoose";

interface RoleProps {
  _id: Types.ObjectId;
  type: string;
  name: string;
}

export class RoleMap {
  constructor(roleProps: RoleProps) {
    this.id = roleProps._id.toString();
    this.type = roleProps.type;
    this.name = roleProps.name;
  }
  id: string;
  type: string;
  name: string;
}
