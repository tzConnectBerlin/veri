export interface Veri {
  id: number;
  event_name: string;
  organizer?: string;
  organizer_email: string;
  event_type: string;
  event_start_date: string;
  event_end_date: string;
  artwork_name: string;
  artwork_description: string;
  live_distribution: string;
  live_distribution_password?: string;
  live_distribution_url?: string;
  file_id: number;
  thumb_id: number;
  status: string;
  file?: object;
}
