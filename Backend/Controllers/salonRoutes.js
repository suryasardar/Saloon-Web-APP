import SalonInfo from '../models/SalonInfo.js';

// Create or Update Salon Info (Admin only)
export const saveSalonInfo = async (req, res) => {
  const { adminId, images, address, contact, services, stylists, seats } = req.body;

  try {
    const existingSalon = await SalonInfo.findOne({ adminId });

    if (existingSalon) {
      existingSalon.images = images;
      existingSalon.address = address;
      existingSalon.contact = contact;
      existingSalon.services = services;
      existingSalon.stylists = stylists;
      existingSalon.seats = seats;

      await existingSalon.save();
      return res.status(200).json({ message: 'Salon info updated', salon: existingSalon });
    }

    const newSalon = await SalonInfo.create({
      adminId,
      images,
      address,
      contact,
      services,
      stylists,
      seats,
    });

    res.status(201).json({ message: 'Salon info created', salon: newSalon });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Salon Info (For Users)
export const getSalonInfo = async (req, res) => {
  const { adminId } = req.params;

  try {
    const salon = await SalonInfo.findOne({ adminId });
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }
    res.status(200).json(salon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Salons (For Users)
export const getAllSalonInfos = async (req, res) => {
  try {
    const salons = await SalonInfo.find();
    res.status(200).json(salons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

