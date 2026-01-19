
import React from 'react'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import { FormDatePicker, FormInput, FormInputNumber, FormSelect, FormTextArea } from '@/components/ui/antd/form'
import { mapEnumToSelectOptions } from '@/utils/helperFuntion'
import { statusType } from '../types/feePolicies'
import { feeDomain, serviceType } from '../types/feePoliciesComponent'
import { PolicyType } from '../schemas/FeeManagement.schema'

interface FormAddPolicyProps {
  control: Control<PolicyType>
  handleSubmit: UseFormHandleSubmit<PolicyType>
  id?: string
  handleUpdate?: (data: PolicyType) => Promise<void>
  onSubmit: (data: PolicyType) => Promise<void>
  isCreate?: boolean
}

const FormAddPolicy = ({
  control,
  handleSubmit,
  id,
  handleUpdate,
  onSubmit,
  isCreate
}: FormAddPolicyProps) => {


  return (
    <>
      <form
        id='policyForm'
        onSubmit={handleSubmit((data) => {
          if (id && handleUpdate) {
            return handleUpdate(data)
          }
          return onSubmit(data)
        })}
      >
        <div className='grid grid-cols-12 gap-2'>
          <FormInput
            name='name'
            control={control}
            label='Tên chính sách phí'
            placeholder='Nhập tên chính sách...'
            className='col-span-12 md:col-span-6'
          />
          <FormInputNumber
            className='col-span-12 md:col-span-6'
            name='priority'
            control={control}
            label='Mức độ ưu tiên'
            placeholder='Nhập mức độ ưu tiên'

          />

          <FormDatePicker
            className='col-span-12 md:col-span-6 flex flex-col'
            name='validFrom'
            control={control}
            label='Hiệu lực từ'
            showTime
          />
          <FormDatePicker
            className='col-span-12 md:col-span-6 flex flex-col'
            name='validTo'
            control={control}
            label='Hiệu lực đến'
            showTime
          />

          <FormSelect
            className='col-span-12 md:col-span-6'
            name='status'
            control={control}
            label='Trạng thái hoạt động'
            options={
              isCreate ? [mapEnumToSelectOptions(statusType)[0]]: mapEnumToSelectOptions(statusType)
            }

          />

          <FormSelect
            className='col-span-12 md:col-span-6'
            name='serviceType'
            control={control}
            label='Loại dịch vụ'
            options={
              mapEnumToSelectOptions(serviceType)
            }
          />
          <FormInput
            className='col-span-12 md:col-span-6'
            name='currency'
            control={control}
            label='Đơn vị thanh toán'
            placeholder='Nhập đơn vị thanh toán...'
          />

          <FormSelect
            className='col-span-12 md:col-span-6'
            name='feeDomain'
            control={control}
            label='Phí miền'
            options={
              mapEnumToSelectOptions(feeDomain)
            }
          />

          <FormTextArea
            className='col-span-12 md:col-span-12'
            name='description'
            control={control}
            label='Mô tả'
            placeholder='Nhập mô tả chính sách...'
          />
        </div>
      </form>
    </>
  )
}

export default FormAddPolicy
