import { antfu as factory } from "@antfu/eslint-config";

export default factory({
    stylistic: {
        semi: true,
        indent: 4,
        quotes: "double",
        overrides: {
            "curly": "off",
            "dot-notation": "off",
            "no-unused-vars": "off",
            "no-extra-boolean-cast": "off",
            "antfu/if-newline": "off",
            "antfu/top-level-function": "off",
            "style/arrow-parens": ["warn", "as-needed"],
            "style/brace-style": ["warn", "1tbs"],
            "style/comma-dangle": ["error", "never"],
            "style/indent": ["error", 4, {
                SwitchCase: 1,
                ignoredNodes: [
                    `FunctionExpression > .params[decorators.length > 0]`,
                    `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
                    `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`
                ]
            }],
            "style/semi": ["error", "always"],
            "style/no-tabs": "off",
            "ts/no-use-before-define": "off"
        }
    },
    vue: {
        overrides: {
            "vue/block-order": ["error", {
                order: ["template", "script", "style"]
            }]
        }
    },
    yaml: {
        overrides: {
            "yaml/indent": ["error", 2]
        }
    }
});
