import { PAGE_SIZE, POPULATE } from "../common/constants";
import {
  CreateProfessionalDTO,
  CreateProfessionalSchema,
  FindAllProfessionalsResponse,
  FindProfessionalsDTO,
  FindProfessionalsSchema,
  ProfessionalResponse,
  UpdateProfessionalDto,
  UpdateProfessionalSchema,
} from "../common/dtos/professional.dto";
import {
  ProfessionalDetailMap,
  ProfessionalMap,
} from "../common/dtos/mapers/professional.map";
import { logError } from "../common/helpers/logger.helper";
import { CustomError } from "../middlewares/error.handler";
import Professional from "../models/professional.model";

const createProfessional = async (body: unknown): Promise<ProfessionalMap> => {
  try {
    const validatedData = <CreateProfessionalDTO>(
      CreateProfessionalSchema.parse(body)
    );
    const create = await Professional.create(validatedData);

    return new ProfessionalMap(create);
  } catch (error) {
    logError(createProfessional.name, error);
    throw error;
  }
};

const getOneProfessional = async (
  id: string
): Promise<ProfessionalResponse> => {
  try {
    const find = await Professional.findById(id)
      .populate(POPULATE.USER)
      .lean()
      .exec();

    if (find) {
      return new ProfessionalDetailMap(find);
    }

    throw new CustomError("No se encontro el profesional", 404, "");
  } catch (error) {
    logError(getOneProfessional.name, error);
    throw error;
  }
};

const getProfessionals = async (
  findProfessionalsDTO: unknown
): Promise<FindAllProfessionalsResponse> => {
  try {
    const validatedData = <FindProfessionalsDTO>(
      FindProfessionalsSchema.parse(findProfessionalsDTO)
    );
    const { page } = validatedData;

    // const query = {
    //   isActive: isActive !== undefined ? isActive : { $ne: null },
    // };

    const professionals = await Professional.find()
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean()
      .exec();

    const response = {
      page: page,
      total: await Professional.countDocuments(),
      data: professionals.map((prof) => new ProfessionalMap(prof)),
    };

    return response;
  } catch (error) {
    logError(getProfessionals.name, error);
    throw error;
  }
};

const updateProfessional = async (id: string, body: unknown): Promise<void> => {
  try {
    const validatedData = <UpdateProfessionalDto>(
      UpdateProfessionalSchema.parse(body)
    );

    const exist = await Professional.exists({ _id: id });
    if (!exist) {
      throw new CustomError("No se encontro el profesional", 404, "");
    }

    await Professional.updateOne({ _id: id }, validatedData);

    return;
  } catch (error) {
    logError(updateProfessional.name, error);
    throw error;
  }
};

export {
  getProfessionals,
  createProfessional,
  getOneProfessional,
  updateProfessional,
};
