import Stylist from "../models/stylist.model.js";
import Salon from "../models/salon.model.js";

export const createStylist = async (req, res) => {
  const stylist = await Stylist.create(req.body);
  // Optionally add stylist to salon.stylists array
  if (stylist.salonId) {
    await Salon.findByIdAndUpdate(stylist.salonId, { $push: { stylists: stylist._id } });
  }
  res.status(201).json(stylist);
};

export const getStylists = async (req, res) => {
  const stylists = await Stylist.find();
  res.json(stylists);
};

export const updateStylist = async (req, res) => {
  const stylist = await Stylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!stylist) return res.status(404).json({ message: "Stylist not found" });
  res.json(stylist);
};

export const deleteStylist = async (req, res) => {
  await Stylist.findByIdAndDelete(req.params.id);
  res.json({ message: "Stylist deleted" });
};
