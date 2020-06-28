class GlobalVars {
    constructor() {
        this._githubApiUrl = 'https://api.github.com/';
        this._backendUrl = '';
    }

    get githubApiUrl() {
        return this._githubApiUrl;
    }

    get backendUrl() {
        return this._backendUrl;
    }
}

export const globals = new GlobalVars();

