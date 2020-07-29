class JsonResponse {
    constructor(JsonResponseBuilder) {
        this.status = JsonResponseBuilder.getStatus();
        this.message = JsonResponseBuilder.getMessage();
        this.data = JsonResponseBuilder.getData();
        this.payload = JsonResponseBuilder.getPayload();
    }
}

module.exports = JsonResponse;
