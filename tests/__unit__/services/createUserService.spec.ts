import { User } from '@prisma/client'
import { prismaMock } from '../../../src/__mocks__/singleton'
import UserDTO from '../../../src/dtos/user.dto'
import CreateUserService from '../../../src/services/users/createUser.service'
import AppError from '../../../src/errors/error'
import { log } from 'console'

describe("###################### Create user service ####################################", () => {

    it('Should create a new user ', async () => {
        const user: UserDTO = {
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed'
        }

        prismaMock.user.findFirst.mockResolvedValueOnce(null)
        prismaMock.user.create.mockResolvedValue(user as User)

        const createUserService = new CreateUserService()
        await expect(createUserService.execute(user)).resolves.toEqual({
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed'
        })
    })

    it("Should throw an error when attempting to create a user with an already existing email", async () => {
        const existingUser: User = {
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed',
        };

        const userDTO: UserDTO = {
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'password',
        };

        prismaMock.user.findFirst.mockResolvedValueOnce(existingUser);

        const createUserService = new CreateUserService()
        const data = createUserService.execute(userDTO)

        await expect(data).rejects.toEqual({ "message": "User already exists!", "statusCode": 400 });
        await expect(data).rejects.toHaveProperty("message", "User already exists!");
        await expect(data).rejects.toHaveProperty('statusCode', 400);
    });
})

