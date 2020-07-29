const JsonResponse = require('./jsonResponse');

class JsonResponseBuilder {
    constructor() {
        this.status = 200;
        this.message = 'OK';
        this.data = null;
        this.payload  = null;
    }
    
    setStatus(status) {
        this.status = status;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setPayload(request) {
        this.payload = {
            baseURL: request.baseUrl,
            cookies: request.cookies,
            method: request.method,
            originalURL: request.originalUrl,
            parameters: request.params,
            body: request.body,
            path: request.path,
            fresh: request.fresh,
            route: request.route
        }
        return this;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getData() {
        return this.data;
    }

    getPayload() {
        return this.payload;
    }

    build() {
        return new JsonResponse(this);
    }
}

module.exports = JsonResponseBuilder;
