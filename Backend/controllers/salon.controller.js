import Salon from "../models/salon.model.js";

export const getSalons = async (req, res) => {
  const salons = await Salon.find()
    .populate("services")
    .populate("stylists")
    .populate({ path: "reviews", options: { sort: { date: -1 } } })
    .populate("currentQueue");
  res.json(salons);
};

export const getSalonById = async (req, res) => {
  const salon = await Salon.findById(req.params.id)
    .populate("services")
    .populate("stylists")
    .populate({ path: "reviews", options: { sort: { date: -1 } } })
    .populate("currentQueue");
  if (!salon) return res.status(404).json({ message: "Salon not found" });
  res.json(salon);
};

export const createSalon = async (req, res) => {
  // Admin check
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  // Accept latitude/longitude for Google Maps
  const { name, address, image, phone, email, latitude, longitude } = req.body;
  const salon = await Salon.create({
    name, address, image, phone, email, latitude, longitude, adminId: req.user._id
  });
  res.status(201).json(salon);
};

export const updateSalon = async (req, res) => {
  // Admin check
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  const salon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!salon) return res.status(404).json({ message: "Salon not found" });
  res.json(salon);
};

export const deleteSalon = async (req, res) => {
  // Admin check
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  await Salon.findByIdAndDelete(req.params.id);
  res.json({ message: "Salon deleted" });
};
