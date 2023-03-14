export class User
{
    // private instance members
    private m_user_id: number;
    private m_user_email_address: string;
    private m_user_password: string;
    private m_user_fname: string;
    private m_user_lname: string;
    private m_user_phone: string;
    private m_user_address: string;
    private m_user_type_id: number;
    private m_user_business_id: number;


    // getters and setters
    public get ID(): number
    {
        return this.m_user_id;
    }
    public get EmailAddress(): string
    {
        return this.m_user_email_address;
    }
    public get Password(): string
    {
        return this.m_user_password;
    }
    public get FirstName(): string
    {
        return this.m_user_fname;
    }
    public get LastName(): string
    {
        return this.m_user_lname;
    }
    public get Phone(): string
    {
        return this.m_user_phone;
    }
    public get Address(): string
    {
        return this.m_user_address;
    }
    public get TypeID(): number
    {
        return this.m_user_type_id;
    }
    public get UserBusinessID(): number
    {
        return this.m_user_business_id;
    }

    
    public set ID(user_id: number)
    {
        this.m_user_id = user_id;
    }
    public set EmailAddress(user_email_address: string)
    {
        this.m_user_email_address = user_email_address;
    }
    public set Password(user_password: string)
    {
        this.m_user_password = user_password;
    }
    public set FirstName(user_fname: string)
    {
        this.m_user_fname = user_fname;
    }
    public set LastName(user_lname: string)
    {
        this.m_user_lname = user_lname;
    }
    public set Phone(user_phone: string)
    {
        this.m_user_phone = user_phone;
    }
    public set Address(user_address: string)
    {
        this.m_user_address = user_address;
    }
    public set TypeID(user_type_id: number)
    {
        this.m_user_type_id = user_type_id;
    }
    public set UserBusinessID(user_business_id: number)
    {
        this.m_user_business_id = user_business_id;
    }

    // constructor
    constructor(user_id : number = 0, user_email_address : string = "", user_password : string = "", user_fname : string = "", user_lname :string = "",
    user_phone : string = "", user_address : string = "", user_type_id : number = 0, user_business_id : number = 0)
    {
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

    // overridden functions

    /**
     * This method overrides the built-in toString method and returns the objects properties as string
     * @override
     * @returns {string}
     */
    // toString(): string
    // {
    //     return `UserID  :${this.ID}\nUserEmailAddress  : ${this.EmailAddress}\nFirstName : ${this.FirstName}
    //     \nLastName : ${this.LastName}\n PhoneNumber  :${this.Phone}\nAddress  :${this.Address}\nUserTypeID  :${this.TypeID}`;
    // }
}



