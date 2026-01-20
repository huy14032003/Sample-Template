import { ButtonComponent, CardComponent, Table } from '@/components/ui/antd/ui'
import React from 'react'
import useMerchant from './hooks/useMerchant'
import { PlusCircleOutlined } from '@/components/icons'

const MerchantFeature = () => {
  const{dataSourceMerchant , columns}=useMerchant()
  return (
    <div>

      <CardComponent
        content={
          <>
            <div className="flex justify-between items-end mb-3">
              <span className='font-bold text-xl'>Merchant</span>
              <ButtonComponent content={<><PlusCircleOutlined /> Thêm mới</>} />
            </div>
            <Table 
            rowKey={'id'}
            bordered
            size='small'
            columns={columns} 
            dataSource={dataSourceMerchant}/>
          </>
        }
      />
    </div>
  )
}

export default MerchantFeature