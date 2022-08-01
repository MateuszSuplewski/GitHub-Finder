import GitHubSDK from './GitHubSDK'
import nodeFetch from "node-fetch"
global.fetch = nodeFetch


describe('Testing SDK', () => {
    it('Should be a class', () => {
        expect.assertions(2)
        expect(() => GitHubSDK()).toThrow("Class constructor GitHubSDK cannot be invoked without 'new'")
        expect(new GitHubSDK()).toBeInstanceOf(GitHubSDK)
    })

    it('Should have valid githubAPI url stored in `url` property', () => {
        expect.assertions(3)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')
        const actualAPIUrl = 'https://api.github.com'

        expect(testSDK.token).toBeDefined()
        expect(actualAPIUrl).toBe(testSDK.url)
        expect(typeof testSDK.token).toBe('string')
    })

    it('Should store token value in `token` property of the instance', () => {
        expect.assertions(3)
        const token = 'tokenValue'
        const testSDK = new GitHubSDK(token)

        expect(testSDK.token).toBeDefined()
        expect(testSDK.token).toBe(token)
        expect(typeof testSDK.token).toBe('string')
    })
    it('Should store nickname value in `nickName` property of the instance', () => {
        expect.assertions(3)
        const token = 'randomToken'
        const nickName = 'randomUser'
        const testSDK = new GitHubSDK(token, nickName)

        expect(testSDK.nickName).toBeDefined()
        expect(testSDK.nickName).toBe(nickName)
        expect(typeof testSDK.nickName).toBe('string')

    })
    it('Should reject if invalid token passed in authorized methods', async () => {
        expect.assertions(1)
        const token = 'invalidToken'
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        try {
            await testSDK.getUser()
        } catch (error) {
            expect(error).toBe('Authentication not passing with current token!')
        }
    })

    it('Should reject if invalid nickName passed in unauthorized methods', async () => {
        expect.assertions(1)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'ThisIsTheUserThatShouldNotExists!!!')

        try {
            await testSDK.getUnauthorizedUser()
        } catch (error) {
            expect(error).toBe('User not found!')
        }
    })

    it('Should return an object with headers data that contains token when calling `getAuthorizationHeader` method', () => {
        expect.assertions(3)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        const result = testSDK.getAuthorizationHeader()
        expect(result.Authorization).toBe(`token ${token}`)
        expect(typeof result).toBe('object')
        expect(result).toBeDefined()
    })

    it('Should return an object that contains data when calling `getUser`', () => {
        expect.assertions(2)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        const result = testSDK.getUser()
        expect(typeof result).toBe('object')
        expect(result).toBeDefined()
    })

    it('Should return an object that contains data when calling `getRepositories`', () => {
        expect.assertions(2)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        const result = testSDK.getRepositories()
        expect(typeof result).toBe('object')
        expect(result).toBeDefined()
    })

    it('Should return an object that contains data when calling `getUnauthorizedRepositories`', () => {
        expect.assertions(2)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        const result = testSDK.getUnauthorizedRepositories()
        expect(typeof result).toBe('object')
        expect(result).toBeDefined()
    })

    it('Should return an object that contains data when calling `getUnauthorizedUser`', () => {
        expect.assertions(2)
        const token = process.env.REACT_APP_TOKEN
        const testSDK = new GitHubSDK(token, 'MateuszSuplewski')

        const result = testSDK.getUnauthorizedUser()
        expect(typeof result).toBe('object')
        expect(result).toBeDefined()
    })
})