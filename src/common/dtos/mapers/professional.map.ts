import { Types } from "mongoose";
import { UserDetailMap } from "./user.map";

interface ProfessionalProps {
  _id: Types.ObjectId;
  name: string;
  category: string;
  description: string;
  ratings: number[];
  averageRating: number;
  pricePerQuote: number;
  image?: string | null;
}

export class ProfessionalMap {
  constructor(professional: ProfessionalProps) {
    this.id = professional._id.toString();
    this.name = professional.name;
    this.category = professional.category;
    this.description = professional.description;
    this.ratings = professional.ratings;
    this.averageRating = professional.averageRating;
    this.pricePerQuote = professional.pricePerQuote;
    this.image = professional.image || "";
  }
  id: string;
  name: string;
  description: string;
  category: string;
  ratings: number[];
  averageRating: number;
  pricePerQuote: number;
  image: string;
}

interface ProfessionalDetailProps extends ProfessionalProps {
  user: any;
  email: string;
  phone: string;
  isActive: boolean;
}

export class ProfessionalDetailMap extends ProfessionalMap {
  constructor(professionalDetailProps: ProfessionalDetailProps) {
    const { user, email, phone, isActive, ...rest } = professionalDetailProps;
    super(rest);
    this.user = new UserDetailMap(user);
    this.email = email;
    this.phone = phone;
    this.isActive = isActive;
  }
  user: UserDetailMap;
  email: string;
  phone: string;
  isActive: boolean;
}
