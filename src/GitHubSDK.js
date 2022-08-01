export class GitHubSDK {
    constructor(token, nickName) {
        this.url = `https://api.github.com`
        this.token = token
        this.nickName = nickName
    }

    getUser() {
        const userUrl = `${this.url}/user`
        const options = {
            headers: this.getAuthorizationHeader()
        }
        return this._fetch(userUrl, options)
    }

    getRepositories() {
        const repositoriesUrl = `${this.url}/user/repos?page=1&per_page=100&affiliation=owner`
        const options = {
            headers: this.getAuthorizationHeader()
        }
        return this._fetch(repositoriesUrl, options)
    }

    getUnauthorizedRepositories() {
        const repositoriesUrl = `${this.url}/users/${this.nickName}/repos?page=1&per_page=100&affiliation=owner`
        return this._fetch(repositoriesUrl)
    }

    getUnauthorizedUser() {
        const userUrl = `${this.url}/users/${this.nickName}`
        return this._fetch(userUrl)
    }

    getAuthorizationHeader() {
        return {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${this.token}`,
        }
    }

    _fetch(url, options = { headers: { Accept: 'application/vnd.github.v3+json' } }) {
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) return resp.json()
                if (resp.status === 401) return Promise.reject('Authentication not passing with current token!')
                if (resp.status === 404) return Promise.reject('User not found!')
                if (resp.status >= 400) return Promise.reject('Something went wrong!')
            })
    }
}

export default GitHubSDK