"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
class Business {
    business_id;
    business_;
    m_user_password;
    m_user_fname;
    m_user_lname;
    m_user_phone;
    m_user_address;
    m_user_type_id;
    m_user_business_id;
    get ID() {
        return this.m_user_id;
    }
    get EmailAddress() {
        return this.m_user_email_address;
    }
    get Password() {
        return this.m_user_password;
    }
    get FirstName() {
        return this.m_user_fname;
    }
    get LastName() {
        return this.m_user_lname;
    }
    get Phone() {
        return this.m_user_phone;
    }
    get Address() {
        return this.m_user_address;
    }
    get TypeID() {
        return this.m_user_type_id;
    }
    get UserBusinessID() {
        return this.m_user_business_id;
    }
    set ID(user_id) {
        this.m_user_id = user_id;
    }
    set EmailAddress(user_email_address) {
        this.m_user_email_address = user_email_address;
    }
    set Password(user_password) {
        this.m_user_password = user_password;
    }
    set FirstName(user_fname) {
        this.m_user_fname = user_fname;
    }
    set LastName(user_lname) {
        this.m_user_lname = user_lname;
    }
    set Phone(user_phone) {
        this.m_user_phone = user_phone;
    }
    set Address(user_address) {
        this.m_user_address = user_address;
    }
    set TypeID(user_type_id) {
        this.m_user_type_id = user_type_id;
    }
    set UserBusinessID(user_business_id) {
        this.m_user_business_id = user_business_id;
    }
    constructor(user_id = 0, user_email_address = "", user_password = "", user_fname = "", user_lname = "", user_phone = "", user_address = "", user_type_id = 0, user_business_id = 0) {
        this.m_user_id = user_id;
        this.m_user_email_address = user_email_address;
        this.m_user_password = user_password;
        this.m_user_fname = user_fname;
        this.m_user_lname = user_lname;
        this.m_user_phone = user_phone;
        this.m_user_address = user_address;
        this.m_user_type_id = user_type_id;
        this.m_user_business_id = user_business_id;
    }

    

    
}
exports.Business = Business;