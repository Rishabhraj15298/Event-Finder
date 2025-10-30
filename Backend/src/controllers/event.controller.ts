import { Request, Response } from "express";
import Event from "../models/event.model";

// Create new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, maxParticipants } = req.body;

    if (!title || !description || !date || !location || !maxParticipants) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      maxParticipants,
      currentParticipants: 0,
    });

    return res.status(201).json({ success: true, data: event });
  } catch (error: any) {
    console.error("❌ Error creating event:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error occurred while creating event" });
  }
};

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;
    const filter: any = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events, // ✅ this includes _id automatically
    });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events",
    });
  }
};

// Get Event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("❌ Error fetching event by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching event",
    });
  }
};
