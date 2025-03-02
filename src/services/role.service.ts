import { logError } from "../common/helpers/logger.helper";
import { CustomError } from "../middlewares/error.handler";
import { RoleMap } from "../common/dtos/mapers/role.map";
import Role from "../models/role.model";
import {
  CreateRoleDTO,
  CreateRoleSchema,
  RoleResponse,
  UpdateRoleDto,
  UpdateRoleSchema,
} from "../common/dtos/role.dto";

const createRole = async (body: unknown): Promise<RoleMap> => {
  try {
    const validatedData = <CreateRoleDTO>CreateRoleSchema.parse(body);
    const create = await Role.create(validatedData);

    return new RoleMap(create);
  } catch (error) {
    logError(createRole.name, error);
    throw error;
  }
};

const getRoles = async (): Promise<RoleResponse> => {
  try {
    const roles = await Role.find().lean().exec();

    return roles.map((role) => new RoleMap(role));
  } catch (error) {
    logError(getRoles.name, error);
    throw error;
  }
};

const updateRole = async (id: string, body: unknown): Promise<void> => {
  try {
    const validatedData = <UpdateRoleDto>UpdateRoleSchema.parse(body);

    const exist = await Role.exists({ _id: id });
    if (!exist) {
      throw new CustomError("No se el rol", 404, "");
    }

    await Role.updateOne({ _id: id }, validatedData);

    return;
  } catch (error) {
    logError(updateRole.name, error);
    throw error;
  }
};

const existRole = async (id: string): Promise<boolean> => {
  try {
    const exist = (await Role.exists({ _id: id })) ? true : false;
    return exist;
  } catch (error) {
    logError(existRole.name, error);
    throw error;
  }
};

export { createRole, getRoles, updateRole, existRole };
