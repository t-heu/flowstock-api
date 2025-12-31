import { Hono } from 'hono';
import swaggerDocument from '../swagger/swagger.json';

export const swagger = new Hono();

// Serve o JSON da spec
swagger.get('/openapi.json', c => c.json(swaggerDocument));

// Serve Swagger UI
swagger.get('/', c =>
  c.html(`
<!DOCTYPE html>
<html>
  <head>
    <title>FlowStock API Docs</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
    />
  </head>
  <body>
    <div id="swagger-ui"></div>

    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function() {
        SwaggerUIBundle({
          url: '/docs/openapi.json', // deve bater com o GET do JSON
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis]
        });
      }
    </script>
  </body>
</html>
`)
);
