class Response {
  static badRequest(res, message='bad parameter'){
    return res.status(400).json({
      status: 400,
      message
    });
  }

  static success(res, code, message, data) {
    return res.status(code).json({
      status: code,
      message,
      data
    });
  }

  static error(res, code, message) {
    return res.status(code).json({
      status: code,
      message
    })
  }
}

export default Response;
