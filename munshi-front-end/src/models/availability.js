"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    m_availability_id;
    m_user_id;
    m_available_date;
    m_available_time_from;
    m_available_time_till;
    m_notes;
    get AvailabilityID() {
        return this.m_availability_id;
    }
    get UserID() {
        return this.m_user_id;
    }
    get AvailableDate() {
        return this.m_available_date;
    }
    get AvailableTimeFrom() {
        return this.m_available_time_from;
    }
    get AvailableTimeTill() {
        return this.m_available_time_till;
    }
    get Notes() {
        return this.m_notes;
    }
    set AvailabilityID(availability_id) {
        this.m_availability_id = availability_id;
    }
    set UserID(user_id) {
        this.m_user_id = user_id;
    }
    set AvailableDate(available_date) {
        this.m_available_date = available_date;
    }
    set AvailAbleTimeFrom(available_time_from) {
        this.m_available_time_from = available_time_from;
    }
    set AvailAbleTimeTill(available_time_till) {
        this.m_available_time_till = available_time_till;
    }
    set Notes(notes) {
        this.m_notes = notes;
    }
    constructor(availability_id = 0, user_id = 0, available_date = "", available_time_from = "", available_time_till = "", notes = "") {
        this.m_availability_id = availability_id;
        this.m_user_id = user_id;
        this.m_available_date = available_date;
        this.m_available_time_from = available_time_from;
        this.m_available_time_till = available_time_till;
        this.m_notes = notes;
    }
    
}
exports.User = User;