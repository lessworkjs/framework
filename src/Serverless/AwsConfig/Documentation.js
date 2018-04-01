'use strict';

class Docs {
  render(fileName, method, _path) {
    const results = {
      description: `API Route 'routes/${fileName}@${method}'`,
      tags: [
        fileName
      ],
    };

    const matches = _path.match(/[^{\}]+(?=})/g);
    if (matches && matches.length) {
      const pathParams = []

      matches.forEach(function (param) {
        pathParams.push({
          "name": param,
          "description": `Path Param '${param}'`,
          "required": true
        });
      });

      results.pathParams = pathParams;
    }

    return results;
  }

}

module.exports = Docs;