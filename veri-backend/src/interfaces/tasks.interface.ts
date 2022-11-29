export interface PepperminteryCreateRequest {
  request_id: number;
  asset_id: number;
  filename: string;
  recipient_ids: number[];
}
export interface Task {
  id: number;
  event_name: string;
  request_id: number;
  asset_id: number;
  filename: string;
  recipient_ids: number[];
}
