import axios from 'axios'
import qs from 'qs';

class Request {
    constructor() {
        this.config = {
            headers: {}
        };
    }

    static create() {
        return new Request();
    }

    static get(url, query) {
        return Request.create().get(url, query);
    }

    static post(url, data) {
        return Request.create().post(url, data);
    }

    static put(url, data) {
        return Request.create().put(url, data);
    }

    static delete(url) {
        return Request.create().delete(url);
    }

    data(data) {
        this.config.data = data;
        if (data instanceof FormData) {
            this.config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            this.config.transformRequest = [data => qs.stringify(data)];
            this.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        return this;
    }

    query(query) {
        this.config.params = query || null;
        return this;
    }

    async get(url, query) {
        this.query(query);
        return this.request('get', url);
    }

    async post(url, data) {
        return this.data(data).request('post', url);
    }

    async put(url, data) {
        return this.data(data).request('put', url);
    }

    async delete(url) {
        return this.request('delete', url);
    }

    async request(method, url) {
        this.config.method = method;
        this.config.url = url;

        return axios(this.config).then(({ data }) => data);
    }
}

export default Request;