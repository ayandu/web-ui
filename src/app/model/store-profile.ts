import { Bank } from '../model/bank';
import { Stock } from '../model/stock';
import { BusinessHours } from '../model/business-hours';

export class StoreProfile {
    constructor(
        public address?: string,
        public badges?: number,
        public bank?: Bank,
        public businessHours?: Array<BusinessHours>,
        public date?: Date,
        public description?: string,
        public featured?: boolean,
        public featuredExpiry?: Date,
        public hasVat?: boolean,
        public id?: string,
        public imageUrl?: string,
        public latitude?: number,
        public likes?: number,
        public longitude?: number,
        public mobileNumber?: string,
        public modifiedDate?: Date,
        public name?: string,
        public ownerId?: string,
        public regNumber?: string,
        public responseTimeMinutes?: number,
        public role?: StoreProfile.RoleEnum,
        public servicesCompleted?: number,
        public stockList?: Array<Stock>,
        public tags?: Array<string>,
        public verificationCode?: string,
        public yearsInService?: number){}
}
// tslint:disable-next-line: no-namespace
export namespace StoreProfile {
    export type RoleEnum = 'CUSTOMER' | 'STORE_ADMIN' | 'STORE' | 'MESSENGER';
    export const RoleEnum = {
        CUSTOMER: 'CUSTOMER' as RoleEnum,
        STOREADMIN: 'STORE_ADMIN' as RoleEnum,
        STORE: 'STORE' as RoleEnum,
        MESSENGER: 'MESSENGER' as RoleEnum
    };
}
