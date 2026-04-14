import { BackgroundService } from "../../models/backgroundService"

export const backgroundServiceQueryKey = "bgs"

export const buildBackgroundServiceQueryKey = (id: BackgroundService["id"]) => [backgroundServiceQueryKey, id]