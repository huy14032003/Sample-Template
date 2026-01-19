import { FormInput, FormSelect } from '@/components/ui/antd/form'
import { ButtonComponent, CardComponent, ModalComponent, Table } from '@/components/ui/antd/ui'
import React from 'react'
import useFeeManagement from './hooks/useFeeManagement'
import { mapEnumToSelectOptions } from '@/utils/helperFuntion'
import { feeDomain, serviceType } from './types/feePoliciesComponent'
import { statusType } from './types/feePolicies'
import { useSVG } from '@/hooks/useSVG'
import FormAddPolicy from './components/FormAddPolicy'

const FeePolicyFeature = () => {
    const {svg}=useSVG()
  const { control, handleSubmit, handleSearch, reset, setOpen, dataSource, columns, page, pageSize, total, setPage, setPageSize, setIsCreate, open, handleSubmitAdd, handleSaveAddFee, loadingNewPolicy, controlAdd, isCreate, searchFeePolicies, getSearchParams } = useFeeManagement()
  return (
    <>
      <CardComponent content={
        <>
          <form
            action=''
            onSubmit={handleSubmit(handleSearch)}
            id='feeManagement'
          >
            <div className='grid grid-cols-1 md:grid-cols-12 gap-3'>
              <FormInput
              className='col-span-1 md:col-span-6'
                name='keyword'
                control={control}
                classNameLable="font-medium"
                label='Tên chính sách'
                placeholder='Nhập tên chính sách..'
              />

              <FormSelect
              className='col-span-1 md:col-span-6'
                name='serviceType'
                control={control}
                classNameLable="font-medium"
                label='Loại dịch vụ'
                placeholder='Chọn loại dịch vụ'
                options={ mapEnumToSelectOptions(serviceType)}
              />
              <FormSelect
              className='col-span-1 md:col-span-6'
                name='status'
                control={control}
                label='Trạng thái'
                placeholder="Chọn trạng thái"
                options={
                   mapEnumToSelectOptions(statusType)
                }
              />
              <FormSelect
              className='col-span-1 md:col-span-6'
                name='feeDomain'
                control={control}
                label='Phí miền'
                placeholder='Chọn phí miền'
                options={
                  
                  mapEnumToSelectOptions(feeDomain)
               }
              />

              <div className='col-span-1 md:col-span-12 flex flex-col md:flex-row md:justify-between gap-3'>
                <div className='flex gap-2 flex-col md:flex-row'>
                  <ButtonComponent
                    htmlType='submit'
                    form='feeManagement'
                    icon={svg('/icons.svg#hugeicons-search-01')}
                    content='Search'
                  />
                  <ButtonComponent
                    htmlType='button'
                    content='Xóa bộ lọc'
                    onClick={()=>{}}
                    type='default'
                    icon={svg('/icons.svg#hugeicons-delete-02')}
                  />
                </div>
                <div className='md:w-auto'>
                  <ButtonComponent
                    className='w-full md:w-auto'
                    htmlType='button'
                    content='Thêm chính sách mới'
                    onClick={() => {
                      setOpen(true)
                      setIsCreate(true)
                    }}
                    type='primary'
                    icon={svg('/icons.svg#hugeicons-plus-sign-circle')}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className='mt-2'>
            <Table
              size='small'
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={{
                current: page,
                showSizeChanger: true,
                pageSize: pageSize,
                total: total,
                onChange: (page, pageSize) => {
                  setPage(page)
                  setPageSize(pageSize)
                }
              }}
            />
          </div>
        </>
      } />


      <ModalComponent
        title='Thêm chính sách mới'
        open={open}
        onOk={handleSubmitAdd(handleSaveAddFee)}
        onCancel={() => setOpen(false)}
        width='50%'
        confirmLoading={loadingNewPolicy}
        modalText={
          <CardComponent
            content={<FormAddPolicy
              control={controlAdd}
              handleSubmit={handleSubmitAdd}
              onSubmit={handleSaveAddFee}
              isCreate={isCreate}
            />
            }
          />

        }
      />
    </>
  )
}

export default FeePolicyFeature