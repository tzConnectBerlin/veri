export interface Recipient {
  id: number;
  token_id: number;
  address: string;
  amount: number;
  state: string;
  created_by?: number;
  operation?: string;
}
