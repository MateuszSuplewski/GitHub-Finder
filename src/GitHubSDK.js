export class GitHubSDK {
    constructor(token, nickName) {
        this.url = `https://api.github.com`
        this.token = token
        this.nickName = nickName
    }

    sendInvitation(repositoryName, collaboratorName) {

        const invitationUrl = `${this.url}/repos/${this.nickName}/${repositoryName}/collaborators/${collaboratorName}`
        const options = {
            method: 'PUT',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: this.getAuthorizationHeader(),
            body: JSON.stringify({
                permission: 'pull'
            }),
        }
        return this._fetch(invitationUrl, options)
    }

    _fetch(url, options) {
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) return resp.json()
                return Promise.reject('Failed to load!')
            })
    }

    getAuthorizationHeader() {
        return {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${this.token}`,
        }
    }

}

export default GitHubSDK