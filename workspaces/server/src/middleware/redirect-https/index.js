const redirectToHttps = (req, res, next) => {
  if (req.secure) {
    next()
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`)
  }
}

module.exports = redirectToHttps
