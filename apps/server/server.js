module.exports = (req, res, next) => {
  if (req.headers["x-api-key"] !== "thisisapikey") {
    return res.sendStatus(401)
  }

  if (req.method === "POST") {
    req.body = req.body || {}
    req.body.createdAt = new Date()
  }

  next()
}
