<%= name %>:
  handler: app/Http/Controllers/<%= name %>.handle
  events:
    - http:
        path: <%= name %>
        method: get
        cors: true
        documentation:
          description: "<%= name %>"
          tags:
            - "<%= name %>"
