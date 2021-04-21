//here I defined the Drug type to be accessible to all components 
export interface Drug {
  name: string;
  UUID: string;
  date_added: Date;
  quantity: number;
  summary: string;
}