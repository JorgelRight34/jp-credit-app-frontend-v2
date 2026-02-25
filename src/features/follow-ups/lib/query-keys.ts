import { CacheKey } from "@/models"
import { FollowUp } from "../models/followUp"

export const followUpsQueryKey = "follow-ups"

export const buildFollowUpQueryKey = (id: FollowUp["id"]): CacheKey => [followUpsQueryKey, id]