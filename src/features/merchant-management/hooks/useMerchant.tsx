import React from 'react'
import { useGetMerchantQuery } from '../services/apiMerchant.api'
import { MerchanColumn } from '../columns/Merchant.column'
import { Merchant, MerchantWithNo } from '../types/merchant.types'

const useMerchant = () => {
    const { data: dataMerchant } = useGetMerchantQuery({})
    const columns = MerchanColumn()
    const dataSourceMerchant: MerchantWithNo[] = dataMerchant?.data.content?.map((item: Merchant, index: number) => ({
        ...item,
        no: index + 1
    })) ?? []
    return {
        columns,
        dataSourceMerchant
    }
}

export default useMerchant