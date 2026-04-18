// const allureWriter = require('@shelex/cypress-allure-plugin/writer');


// module.exports = (on, config) => {
//     allureWriter(on, config);
//     return config;
// };

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('file:preprocessor', webpackPreprocessor);
            allureWriter(on, config);
            return config;
        },
        env: {
            allureReuseAfterSpec: true
        }
    }
})