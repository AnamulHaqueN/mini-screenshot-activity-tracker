import { HttpContext } from '@adonisjs/core/http'
import { readFileSync } from 'node:fs'
import yaml from 'js-yaml'
import app from '@adonisjs/core/services/app'

export default class DocsController {
   /**
    * Serve Swagger UI HTML page at /api/docs
    */
   async index({ response }: HttpContext) {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EzyStaff API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  <style>
    body { margin: 0; padding: 0; }
    .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/docs/spec',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: 'StandaloneLayout',
        persistAuthorization: true,
        tryItOutEnabled: true
      });
    };
  </script>
</body>
</html>
    `

      response.header('Content-Type', 'text/html')
      return response.send(html)
   }

   /**
    * Serve OpenAPI spec as JSON at /api/docs/spec
    */
   async spec({ response }: HttpContext) {
      try {
         const specPath = app.makePath('docs/api/openapi.yaml')
         const fileContents = readFileSync(specPath, 'utf8')
         const spec = yaml.load(fileContents)

         response.header('Content-Type', 'application/json')
         return response.send(spec)
      } catch (error) {
         return response.status(500).send({
            error: 'Failed to load API specification',
            message: error.message,
         })
      }
   }
}
