import { Request } from 'express';

export interface Veri {
  id: number;
  event_name: string;
  event_description: string;
  event_contact_email: string;
  event_type: string;
  event_start_date: string;
  event_end_date: string;
  artwork_name: string;
  artwork_description: string;
  live_distribution: boolean;
  live_distribution_url: string;
}

export interface RequestWithFile extends Request {
  file: Express.Multer.File;
}
