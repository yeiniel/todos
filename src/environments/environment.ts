import { environment as environmentDev } from './environment.development';

export const environment = {
    ...environmentDev,
    useEmulators: false
}