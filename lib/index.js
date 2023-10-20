"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get('/', (req, res) => {
            res.status(200).send(' App is running...');
        });
    }
}
exports.default = new IndexRoute().router;
//# sourceMappingURL=index.js.map