const BaseCommand = require('../BaseCommand');

class Serve extends BaseCommand {

  static get signature() {
    return `serve 
      {-p ,--prefix=@value: Adds a prefix to every path, to send your requests to http://localhost:3000/[prefix]/[your_path] instead. E.g. -p dev}
      {-l ,--location=@value: The root location of the handlers' files. Defaults to the current directory}
      {-o ,--host=@value: Host name to listen on. Default: localhost}
      {-P ,--port=@value: Port to listen on. Default: 3000}
      {-s ,--stage=@value: The stage used to populate your templates. Default: the first stage found in your project.}
      {-r ,--region=@value: The region used to populate your templates. Default: the first region for the first stage found.}
      {-t ,--noTimeout=@value: Disables the timeout feature.}
      {--noEnvironment=@value: Turns off loading of your environment variables from serverless.yml. Allows the usage of tools such as PM2 or docker-compose.}
      {--resourceRoutes=@value: Turns on loading of your HTTP proxy settings from serverless.yml.}
      {--dontPrintOutput=@value: Turns off logging of your lambda outputs in the terminal.}
      {-H ,--httpsProtocol=@value: To enable HTTPS, specify directory (relative to your cwd, typically your project dir) for both cert.pem and key.pem files.}
      {-c ,--skipCacheInvalidation=@value: Tells the plugin to skip require cache invalidation. A script reloading tool like Nodemon might then be needed.}
      {--corsAllowOrigin=@value: Used as default Access-Control-Allow-Origin header value for responses. Delimit multiple values with commas. Default: '*'}
      {--corsAllowHeaders=@value: Used as default Access-Control-Allow-Headers header value for responses. Delimit multiple values with commas. Default: 'accept,content-type,x-api-key'}
      {--corsDisallowCredentials=@value: When provided, the default Access-Control-Allow-Credentials header value will be passed as 'false'. Default: true}
      {--exec "<script>"=@value: When provided, a shell script is executed when the server starts up, and the server will shut down after handling this command.}
      {--noAuth=@value: Turns off all authorizers
    `;
  }

  static get description() {
    return 'Run the `serverless-offline` development server...';
  }

  handle(options, flags) {
    this.warn(`${this.icon('info')} Starting development server.`);

    this.run('sls offline start', flags);
  }
}

module.exports = Serve;