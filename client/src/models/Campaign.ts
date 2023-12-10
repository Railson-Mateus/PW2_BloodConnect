import { z } from "zod";

export interface ICampaign {
  id: string;
  title: string;
  image: string;
  description: string;
  local: string;
  startDate: Date | string;
  endDate: Date | string;
  createdAt: Date;
  updatedAt: Date | null;
}

export const CampaignSchemaCreate = z.object({
  title: z.string().min(1, {message: "Título é obrigatório"}),
  image: z.any(),
  description: z.string().min(1,{message:"Descrição é obrigatoria"}),
  local: z.string().min(1, {message: "O local da campanha é obrigatório"}),
  startDate: z.string().min(1, {message: "Data de inicio é obrigatoria"}),
  endDate: z.string().min(1,{message:"Data de finalização é obrigatoria"}),
})

export type CampaignCreateType = z.infer<typeof CampaignSchemaCreate>

export const CampaignSchemaUpdate = CampaignSchemaCreate.partial()

export type CampaignUpdateType = z.infer<typeof CampaignSchemaUpdate>