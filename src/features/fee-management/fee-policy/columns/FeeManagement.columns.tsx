import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons'

import { ColumnsType } from 'antd/es/table'
import { ButtonComponent, TooltipComponent } from '@/components/ui/antd/ui'
import { formatDate, getEnumLabel } from '../utils/FeeManagement.utils'
import { FEEMANAGEMENT } from '@/constants/route.constant'
import { statusType } from '../types/feePolicies'
import { feeDomain, serviceType } from '../types/feePoliciesComponent'

// Types
interface PolicyRecord {
  key: string
  no: number
  name: string
  serviceType: string
  status: string
  feeDomain: string
  currency: string
  validFrom: string
  validTo: string
}

interface PolicyColumnsOptions {
  navigate: (path: string) => void
  handleDeActiveFee: (record: PolicyRecord) => void
  handleActiveFee: (record: PolicyRecord) => void
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-2  rounded-md  whitespace-nowrap  text-xs font-medium ${status === 'ACTIVE'
      ? 'bg-green-50 border border-green-800 text-green-800'
      : `${status == 'INIT' ? 'bg-blue-50 border border-blue-400 text-blue-800' : 'bg-red-50 border border-red-800 text-red-800 '}`
      }`}
  >
    {getEnumLabel(status, statusType)}
  </span>
)

// Action buttons component
const ActionButtons = ({
  record,
  navigate,
  handleDeActiveFee,
  handleActiveFee
}: {
  record: PolicyRecord
  navigate: (path: string) => void
  handleDeActiveFee: (record: PolicyRecord) => void
  handleActiveFee: (record: PolicyRecord) => void
}) => (
  <div className='flex gap-2 justify-center'>
    <TooltipComponent title='Cập nhật'>

      <ButtonComponent
        type='default'
        size='small'
        icon={<EditOutlined />}
        onClick={() => navigate(`${FEEMANAGEMENT}/edit/${record.key}`)}
      />

    </TooltipComponent>
    <TooltipComponent title={record.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}>


      <ButtonComponent
        type='default'
        size='small'
        icon={
          record.status === 'ACTIVE' ? (
            <UnlockOutlined />
          ) : (
            <LockOutlined />
          )
        }
        onClick={() => {
          if (record.status === 'ACTIVE') {
            handleDeActiveFee(record)
          } else {
            handleActiveFee(record)
          }
        }}
      />
    </TooltipComponent>
  </div>
)

export const getPolicyColumns = ({
  navigate,
  handleDeActiveFee,
  handleActiveFee
}: PolicyColumnsOptions): ColumnsType<PolicyRecord> => [
    {
      title: '#',
      dataIndex: 'no',
      width: 60,
      align: 'center',
    },
    {
      title: 'Tên chính sách',
      dataIndex: 'name',
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'serviceType',
      render: (value: string) => getEnumLabel(value, serviceType)
    },

    {
      title: 'Phí miền',
      dataIndex: 'feeDomain',
      render: (value: string) => getEnumLabel(value, feeDomain)
    },
    {
      title: 'Loại tiền',
      dataIndex: 'currency',
    },
    {
      title: 'Hiệu lực từ',
      dataIndex: 'validFrom',
      render: (date: string) => formatDate(date)
    },
    {
      title: 'Hiệu lực đến',
      dataIndex: 'validTo',
      render: (date: string) => {
        if (date === null || '' || 0) {
          return 'Vô thời hạn'
        }
        else {
          return formatDate(date)
        }
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => <StatusBadge status={status} />
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      fixed:'right',
      render: (_, record) => (
        <ActionButtons
          record={record}
          navigate={navigate}
          handleDeActiveFee={handleDeActiveFee}
          handleActiveFee={handleActiveFee}
        />
      )
    }
  ]
