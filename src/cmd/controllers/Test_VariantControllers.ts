import { Request, Response } from "express";

import test_variants from "../services/test_variants";

export default new (class TestVariantsControllers {
  async testVariant(req: Request, res: Response) {
    test_variants.testVariant(req, res);
  }
})();
