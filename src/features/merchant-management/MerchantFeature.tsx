import { ButtonComponent, CardComponent, Table } from '@/components/ui/antd/ui'
import React from 'react'
import useMerchant from './hooks/useMerchant'

const MerchantFeature = () => {
  const{dataSourceMerchant , columns}=useMerchant()
  return (
    <div>

      <CardComponent
        content={
          <>
            <div className="flex justify-end mb-3">
              <ButtonComponent content={'Thêm mới'} />
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