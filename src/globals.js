class GlobalVars {
    constructor() {
        this._githubApiUrl = 'https://api.github.com/';
        this._backendUrl = '';
    }

    get githubApiUrl() {
        return this._githubApiUrl;
    }

    set githubApiUrl(value) {
        this._githubApiUrl = value;
    }

    get backendUrl() {
        return this._backendUrl;
    }

    set backendUrl(value) {
        this._backendUrl = value;
    }
}
export default GlobalVars;

