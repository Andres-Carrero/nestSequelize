export class PaymentYsapDto {
    dateTime: string;
    nameClient: string;
    product: string;
    direction: string;
    Qrcode: string;
    docValue: string;
    typeCoin: string;
    hash: string
    statusTx: string
    valueChange: string
    deleteAt: Date
    status: boolean
    idtransaction: string 
}


export class AddressYsapDto {
    btcAddress: string;
    tag: string;
    balance: string;
    deleteAt: string;
    status: string;
    usersId: number
    unique_id: string;
}


export class ButtonYsapDto {
    title: string;
    documentCurrency: string;
    product: string;
    token: string;
    duration: Date;
    apikey: string
    buttonId: number
    description: string;
    values: string;
    TypeCoin: string
    createdAt: Date
    addressId: string
    txId: string
    deleteAt: Date
    statusId: number
    unique_id: string 
}

export class UsersYsapDto {
    name: string;
    email: string;
    password: string;
    apikey: string;
    updatedAt: Date
    deleteAt: Date
    status: boolean
    unique_id: string 
}

export class buttonGenerateDto {
    name: string;
    duration: string;
    typeCoin: string;
    addressId: string;
    description: string;
    userId: string
    statusId: string
    deleteAt: string;
    unique_id: string;
}