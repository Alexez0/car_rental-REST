class errors extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new errors(404, message)
    }

    static internal(message){
        return new errors(500, message)
    }
}

module.exports = errors