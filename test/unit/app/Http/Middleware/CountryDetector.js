class CountryDetector {
  async handle(request, next) {
    await next();
  }
}

module.exports = CountryDetector;