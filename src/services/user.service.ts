import { PAGE_SIZE, POPULATE } from "../common/constants";
import {
  UserResponse,
  CreateUserDTO,
  CreateUserSchema,
  FindAllUsersResponse,
  FindUsersDTO,
  FindUsersSchema,
  UpdateUserDto,
  UpdateUserSchema,
} from "../common/dtos/user.dto";
import {
  UserDetailMap,
  UserMap,
  UserSystemMap,
} from "../common/dtos/mapers/user.map";
import { logError } from "../common/helpers/logger.helper";
import { CustomError } from "../middlewares/error.handler";
import User from "../models/user.model";
import { hashPassword } from "../common/helpers";

const createUser = async (body: unknown): Promise<UserMap> => {
  try {
    const validatedData = <CreateUserDTO>(
      await CreateUserSchema.parseAsync(body)
    );

    const { password } = validatedData;
    const passHash = await hashPassword(password);
    const create = await User.create({ ...validatedData, password: passHash });

    return new UserMap(create);
  } catch (error) {
    logError(createUser.name, error);
    throw error;
  }
};

const getOneUser = async (id: string): Promise<UserResponse> => {
  try {
    const find = await User.findById(id).populate(POPULATE.ROLE).lean().exec();

    if (find) {
      return new UserDetailMap(find);
    }

    throw new CustomError("No se encontro el usuario", 404, "");
  } catch (error) {
    logError(getOneUser.name, error);
    throw error;
  }
};

const getUsers = async (
  findBranchesDTO: unknown
): Promise<FindAllUsersResponse> => {
  try {
    const validatedData = <FindUsersDTO>FindUsersSchema.parse(findBranchesDTO);
    const { page } = validatedData;

    // const query = {
    //   isActive: isActive !== undefined ? isActive : { $ne: null },
    //   company: company,
    // };

    const users = await User.find()
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .populate(POPULATE.ROLE)
      .lean()
      .exec();

    const response = {
      page: page,
      total: await User.countDocuments(),
      data: users.map((company) => new UserMap(company)),
    };

    return response;
  } catch (error) {
    logError(getUsers.name, error);
    throw error;
  }
};

const updateUser = async (id: string, body: unknown): Promise<void> => {
  try {
    const validatedData = <UpdateUserDto>UpdateUserSchema.parse(body);

    const exist = await User.exists({ _id: id });
    if (!exist) {
      throw new CustomError("No se encontro el usuario", 404, "");
    }

    await User.updateOne({ _id: id }, validatedData);

    return;
  } catch (error) {
    logError(updateUser.name, error);
    throw error;
  }
};

const getOneUserSystem = async (key: object): Promise<UserSystemMap> => {
  try {
    const find = await User.findOne(key).populate(POPULATE.ROLE).lean().exec();

    if (find) {
      return new UserSystemMap(find);
    }

    throw new CustomError("No se encontro el usuario", 404, "");
  } catch (error) {
    logError(getOneUserSystem.name, error);
    throw error;
  }
};

export { createUser, getOneUser, getUsers, updateUser, getOneUserSystem };
