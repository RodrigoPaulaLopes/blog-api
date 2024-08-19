import { User } from '@prisma/client'
import { prismaMock } from '../../__mocks__/singleton'
import UserDTO from '../../dtos/user.dto'
import CreateUserService from './createUser.service'
describe("###################### Create user service ####################################", () => {

    it('should create new user ', async () => {
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

})
