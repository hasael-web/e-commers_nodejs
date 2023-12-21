import { Request, Response } from "express";

type TVariants = {
  varians: TChildVariants[];
};

type TChildVariants = {
  color: string;
  varian: TVariant[];
};

type TVariant = {
  size: string;
  price: number;
};

export default new (class Test_Variants {
  async testVariant(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      body.varians.forEach((varian: any) => {
        console.log(`Color: ${varian?.color}`);
        varian?.varian_detail?.forEach((detail: any) => {
          console.log(
            `Size: ${detail.size}, Price: ${detail.price}, Stock: ${detail.stock}`
          );
        });
      });
      console.log(body);
    } catch (error) {
      return res
        .status(500)
        .json({ code: 500, message: "internal server error test variants" });
    }
  }
})();
