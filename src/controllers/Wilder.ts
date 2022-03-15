import { Request, Response } from 'express';

const WilderModel = require('../models/Wilder');

const wilderController = {
  create: async (req: Request, res: Response) => {
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },

  read: async (req: Request, res: Response) => {
    const result = await WilderModel.find({});
    res.json({ success: true, result });
  },

  update: async (req: Request, res: Response) => {
    const result = await WilderModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    res.json({ success: true, result });
  },

  delete: async (req: Request, res: Response) => {
    // const result = await WilderModel.deleteMany({});
    const result = await WilderModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(204);
    }
    res.json({ success: true, result });
  },
};

export default wilderController;
