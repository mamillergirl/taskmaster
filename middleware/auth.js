module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.send(
          `<p>Sign in with Google First</p><button><a href="/google">Sign In</a></button>`)
      }
    },
    
  }