import { PrismaClient, User } from "@prisma/client";
import UserDTO from "../../dtos/user.dto";
import AppError from "../../errors/error";

const prisma = new PrismaClient();

class CreateUserService {
    async execute({ name, email }: UserDTO): Promise<UserDTO> {
        const isRegistered: User | null = await prisma.user.findFirst({
            where: {
              email: email,
            },
          })

        if(isRegistered) throw new AppError('User already exists!', 400)

        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        return user as UserDTO;
    }
}

export default CreateUserService;
