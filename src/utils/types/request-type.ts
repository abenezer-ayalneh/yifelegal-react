export type RequestType = {
    id: number,
    is_request_for_others: number,
    requested_for?: string,
    requested_for_phone_number?: string,
    created_by: number,
    updated_by: number,
    deleted_by?: number,
    deleted_at?: string,
    created_at?: string,
    updated_at?: string,
    detail: RequestDetailType[]
}

export type RequestDetailType = {
    id: number,
    request_id: number,
    attribute: string,
    value: string,
    created_by: number,
    updated_by: number,
    created_at?: string,
    updated_at?: string,
    deleted_by?: number,
    deleted_at?: string,
}