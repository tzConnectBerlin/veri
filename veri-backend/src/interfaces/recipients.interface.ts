export interface Recipient {
  id?: number;
  token_id: number;
  address: string;
  amount: number;
  state: string;
  status?: string;
  created_by?: number;
  operation?: string;
}
