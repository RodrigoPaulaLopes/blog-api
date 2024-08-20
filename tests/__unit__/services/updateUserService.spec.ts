import { User } from '@prisma/client'
import { prismaMock } from '../../../src/__mocks__/singleton'
import UserDTO from '../../../src/dtos/user.dto'
import CreateUserService from '../../../src/services/users/createUser.service'
import UpdateUserService from '../../../src/services/users/updateUser.service'


describe("###################### Update user service ####################################", () => {

    it('Should update an user ', async () => {
        const user: UserDTO = {
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed'
        }

        prismaMock.user.findFirst.mockResolvedValueOnce(user as User)
        prismaMock.user.update.mockResolvedValue(user as User)

        const updateUserService = new UpdateUserService()
        await expect(updateUserService.execute(user)).resolves.toEqual({
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed'
        })
    })
    it('Should return an error when try to update an use that not existsr ', async () => {
        const user: UserDTO = {
            id: 1,
            name: 'Rich',
            email: 'hello@prisma.io',
            password: 'hashed'
        }

        prismaMock.user.findFirst.mockResolvedValueOnce(null)
        prismaMock.user.update.mockResolvedValue(user as User)

        const updateUserService = new UpdateUserService()
        await expect(updateUserService.execute(user)).rejects.toEqual({"message": "User not exists", "statusCode": 404})
        await expect(updateUserService.execute(user)).rejects.toHaveProperty("message", "User not exists")
        await expect(updateUserService.execute(user)).rejects.toHaveProperty("statusCode", 404)
    })

    
})

