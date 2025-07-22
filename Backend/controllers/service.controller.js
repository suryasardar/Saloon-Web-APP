import Service from "../models/service.model.js";
import Salon from "../models/salon.model.js";

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  // Optionally add service to salon.services array
  if (service.salonId) {
    await Salon.findByIdAndUpdate(service.salonId, { $push: { services: service._id } });
  }
  res.status(201).json(service);
};

export const getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
};

export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};

