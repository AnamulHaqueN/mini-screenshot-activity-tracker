// src/rules/prefer_lazy_listener_import.ts
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

// src/utils.ts
import { ESLintUtils } from "@typescript-eslint/utils";
var createEslintRule = ESLintUtils.RuleCreator((ruleName) => `https://github.com/adonisjs/eslint-plugin-adonisjs#${ruleName}`);

// src/rules/prefer_lazy_listener_import.ts
var prefer_lazy_listener_import_default = createEslintRule({
  name: "prefer-lazy-listener-import",
  defaultOptions: [],
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description: "(Needed for HMR) Prefer lazy listener import over standard import"
    },
    schema: [],
    messages: {
      preferLazyListenerImport: "Replace standard import with lazy listener import"
    }
  },
  create: function(context) {
    const importNodes = {};
    const importIdentifiers = [];
    let emitterIdentifier = "";
    function isEmitterOnCallExpression(node, routerIdentifier) {
      return node.callee.type === AST_NODE_TYPES.MemberExpression && node.callee.object.type === AST_NODE_TYPES.Identifier && node.callee.object.name === routerIdentifier && node.callee.property.type === AST_NODE_TYPES.Identifier && node.callee.property.name === "on";
    }
    return {
      /**
       * Track all imported identifiers
       * Also get the local name of the emitter import
       */
      ImportDeclaration(node) {
        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportSpecifier") {
            importIdentifiers.push(specifier.local.name);
            importNodes[specifier.local.name] = node;
          }
        }
        if (node.source.value === "@adonisjs/core/services/emitter") {
          if (node.specifiers[0] && node.specifiers[0].type === "ImportDefaultSpecifier") {
            emitterIdentifier = node.specifiers[0].local.name;
          }
        }
      },
      CallExpression(node) {
        if (!isEmitterOnCallExpression(node, emitterIdentifier)) {
          return;
        }
        const secondArgument = node.arguments[1];
        if (secondArgument.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }
        for (const element of secondArgument.elements) {
          if (!element) {
            continue;
          }
          if (element.type !== "Identifier" || !importIdentifiers.includes(element.name)) {
            continue;
          }
          context.report({
            node: importNodes[element.name],
            messageId: "preferLazyListenerImport",
            fix(fixer) {
              const importPath = importNodes[element.name].source.raw;
              const newImportDeclaration = `const ${element.name} = () => import(${importPath})`;
              return fixer.replaceText(importNodes[element.name], newImportDeclaration);
            }
          });
        }
      }
    };
  }
});

// src/rules/prefer_lazy_controller_import.ts
import { AST_NODE_TYPES as AST_NODE_TYPES2 } from "@typescript-eslint/utils";
var HTTP_METHODS = ["get", "post", "put", "delete", "patch"];
var prefer_lazy_controller_import_default = createEslintRule({
  name: "prefer-lazy-controller-import",
  defaultOptions: [],
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description: "(Needed for HMR) Prefer lazy controller import over standard import"
    },
    schema: [],
    messages: {
      preferLazyControllerImport: "Replace standard import with lazy controller import"
    }
  },
  create: function(context) {
    const importNodes = {};
    const importIdentifiers = [];
    let routerIdentifier = "";
    function isRouteCallExpression(node, identifier) {
      return node.callee.type === AST_NODE_TYPES2.MemberExpression && node.callee.object.type === AST_NODE_TYPES2.Identifier && node.callee.object.name === identifier && node.callee.property.type === AST_NODE_TYPES2.Identifier && HTTP_METHODS.includes(node.callee.property.name);
    }
    function isRouteResourceCallExpression(node, identifier) {
      return node.callee.type === AST_NODE_TYPES2.MemberExpression && node.callee.object.type === AST_NODE_TYPES2.Identifier && node.callee.object.name === identifier && node.callee.property.type === AST_NODE_TYPES2.Identifier && node.callee.property.name === "resource";
    }
    return {
      /**
       * Track all imported identifiers
       * Also get the local name of the router import
       */
      ImportDeclaration(node) {
        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportSpecifier") {
            importIdentifiers.push(specifier.local.name);
            importNodes[specifier.local.name] = node;
          }
        }
        if (node.source.value === "@adonisjs/core/services/router") {
          if (node.specifiers[0] && node.specifiers[0].type === "ImportDefaultSpecifier") {
            routerIdentifier = node.specifiers[0].local.name;
          }
        }
      },
      CallExpression(node) {
        let controller = null;
        if (isRouteCallExpression(node, routerIdentifier)) {
          const secondArgument = node.arguments[1];
          if (secondArgument.type === AST_NODE_TYPES2.ArrayExpression) {
            controller = secondArgument.elements[0];
          }
        }
        if (isRouteResourceCallExpression(node, routerIdentifier)) {
          controller = node.arguments[1];
        }
        if (!controller) {
          return;
        }
        if (controller.type !== "Identifier" || !importIdentifiers.includes(controller.name)) {
          return;
        }
        context.report({
          node: importNodes[controller.name],
          messageId: "preferLazyControllerImport",
          fix(fixer) {
            const importPath = importNodes[controller.name].source.raw;
            const newImportDeclaration = `const ${controller.name} = () => import(${importPath})`;
            return fixer.replaceText(importNodes[controller.name], newImportDeclaration);
          }
        });
      }
    };
  }
});

// src/rules/prefer_adonisjs_inertia_link.ts
import { AST_NODE_TYPES as AST_NODE_TYPES3 } from "@typescript-eslint/utils";
var INERTIA_PACKAGES = ["@inertiajs/react", "@inertiajs/vue3"];
var prefer_adonisjs_inertia_link_default = createEslintRule({
  name: "prefer-adonisjs-inertia-link",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer the typesafe @adonisjs/inertia Link component over the @inertiajs Link component"
    },
    schema: [],
    messages: {
      preferAdonisInertiaLink: "Prefer importing Link from @adonisjs/inertia/{{ framework }} for typesafe routing instead of {{ source }}"
    }
  },
  create: function(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (!INERTIA_PACKAGES.includes(source)) return;
        const hasLinkImport = node.specifiers.some((specifier) => {
          if (specifier.type !== AST_NODE_TYPES3.ImportSpecifier) return false;
          return specifier.imported.type === AST_NODE_TYPES3.Identifier && specifier.imported.name === "Link";
        });
        if (!hasLinkImport) return;
        const framework = source === "@inertiajs/react" ? "react" : "vue";
        context.report({
          node,
          messageId: "preferAdonisInertiaLink",
          data: { framework, source }
        });
      }
    };
  }
});

// src/rules/prefer_adonisjs_inertia_form.ts
import { AST_NODE_TYPES as AST_NODE_TYPES4 } from "@typescript-eslint/utils";
var INERTIA_PACKAGES2 = ["@inertiajs/react", "@inertiajs/vue3"];
var prefer_adonisjs_inertia_form_default = createEslintRule({
  name: "prefer-adonisjs-inertia-form",
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer the typesafe @adonisjs/inertia Form component over the @inertiajs Form component"
    },
    schema: [],
    messages: {
      preferAdonisInertiaForm: "Prefer importing Form from @adonisjs/inertia/{{ framework }} for typesafe routing instead of {{ source }}"
    }
  },
  create: function(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (!INERTIA_PACKAGES2.includes(source)) return;
        const hasFormImport = node.specifiers.some((specifier) => {
          if (specifier.type !== AST_NODE_TYPES4.ImportSpecifier) return false;
          return specifier.imported.type === AST_NODE_TYPES4.Identifier && specifier.imported.name === "Form";
        });
        if (!hasFormImport) return;
        const framework = source === "@inertiajs/react" ? "react" : "vue";
        context.report({
          node,
          messageId: "preferAdonisInertiaForm",
          data: { framework, source }
        });
      }
    };
  }
});

// src/rules/no_backend_import_in_frontend.ts
import micromatch from "micromatch";
import { dirname, resolve } from "path";
import { readPackageUpSync } from "read-package-up";
var packageCache = /* @__PURE__ */ new Map();
function getSubpathImports(filename) {
  const cwd = dirname(filename);
  if (packageCache.has(cwd)) return packageCache.get(cwd).imports;
  const result = readPackageUpSync({ cwd, normalize: false });
  if (!result) {
    packageCache.set(cwd, { imports: null });
    return null;
  }
  const imports = result.packageJson.imports ?? null;
  packageCache.set(cwd, { imports });
  return imports;
}
function resolveImportTarget(target) {
  if (typeof target === "string") return [target];
  if (Array.isArray(target)) return target;
  if (typeof target === "object") return Object.values(target).flatMap(resolveImportTarget);
  return [];
}
function subpathResolvesToFrontend(options) {
  const { importPath, subpathImports } = options;
  for (const [pattern, target] of Object.entries(subpathImports)) {
    const patternBase = pattern.replace("/*", "").replace("*", "");
    const importBase = importPath.replace("/*", "").replace("*", "");
    if (importPath === pattern || importBase.startsWith(patternBase)) {
      const resolvedPaths = resolveImportTarget(target);
      const isFrontend = resolvedPaths.some((resolved) => {
        return resolved.startsWith("./inertia/") || resolved.startsWith("inertia/");
      });
      if (isFrontend) return true;
    }
  }
  return false;
}
function relativePathResolvesToFrontend(options) {
  const { importPath, filename } = options;
  const absolutePath = resolve(dirname(filename), importPath);
  return /[\\/]inertia[\\/]/.test(absolutePath);
}
var no_backend_import_in_frontend_default = createEslintRule({
  name: "no-backend-import-in-frontend",
  defaultOptions: [{ allowed: [] }],
  meta: {
    type: "problem",
    docs: {
      description: "Disallow importing backend code in frontend (Inertia) files"
    },
    schema: [
      {
        type: "object",
        properties: {
          allowed: {
            type: "array",
            items: { type: "string" },
            description: 'List of allowed import paths or glob patterns (e.g. "#shared/*", "#enums")'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      noBackendImport: 'Importing backend code "{{ importPath }}" in frontend files is not allowed. Use `import type` for type-only imports, or add the path to the `allowed` option.'
    }
  },
  create: function(context, options) {
    const filename = context.filename;
    const allowed = options[0]?.allowed ?? [];
    const isInInertiaFolder = /[\\/]inertia[\\/]/.test(filename);
    if (!isInInertiaFolder) return {};
    const subpathImports = getSubpathImports(filename);
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (node.importKind === "type") return;
        if (allowed.length > 0 && micromatch.isMatch(importPath, allowed)) return;
        if (importPath.startsWith("#")) {
          if (!subpathImports) return;
          if (subpathResolvesToFrontend({ importPath, subpathImports })) return;
          context.report({ node, messageId: "noBackendImport", data: { importPath } });
          return;
        }
        if (importPath.startsWith(".")) {
          if (relativePathResolvesToFrontend({ importPath, filename })) return;
          context.report({ node, messageId: "noBackendImport", data: { importPath } });
        }
      }
    };
  }
});

// index.ts
var index_default = {
  rules: {
    "prefer-lazy-controller-import": prefer_lazy_controller_import_default,
    "prefer-lazy-listener-import": prefer_lazy_listener_import_default,
    "prefer-adonisjs-inertia-link": prefer_adonisjs_inertia_link_default,
    "prefer-adonisjs-inertia-form": prefer_adonisjs_inertia_form_default,
    "no-backend-import-in-frontend": no_backend_import_in_frontend_default
  }
};
export {
  index_default as default
};
