"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
class Business {
    m_business_id;
    m_business_name;
    m_business_address;
    m_business_phone;
    get ID() {
        return this.m_business_id;
    }
    get Name() {
        return this.m_business_name;
    }
    get Address() {
        return this.m_business_phone;
    }
    get Phone() {
        return this.m_business_address;
    }
    set ID(business_id) {
        this.m_business_id = business_id;
    }
    set Address(business_address) {
        this.m_business_address = business_address;
    }
    set Name(business_name) {
        this.m_business_name = business_name;
    }
    set Phone(business_phone) {
        this.m_business_phone = business_phone;
    }
    constructor(business_id, business_name, business_address, business_phone) {
        this.m_business_id = business_id;
        this.m_business_name = business_name;
        this.m_business_address = business_address;
        this.m_business_phone = business_phone;
      }
}
exports.Business = Business;