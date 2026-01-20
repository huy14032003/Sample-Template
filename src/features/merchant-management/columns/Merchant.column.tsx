import { DeleteOutlined, EditOutlined, EyeFilled } from "@/components/icons";
import { ButtonComponent } from "@/components/ui/antd/ui";
import { ColumnsType } from "antd/es/table";

export const MerchanColumn=():ColumnsType=>[
    {
        title:'#',
        dataIndex:'no',
        align:'center'
    },
    {
        title:'Tên merchant',
        dataIndex:'name',
        align:'center'
    },
    {
        title:'Mã merchant',
        dataIndex:'code',
        align:'center'
    },
    {
        title:'Email',
        dataIndex:'contactEmail',
        align:'center'
    },
    {
        title:'Điện thoại',
        dataIndex:'contactPhone',
        align:'center'
    },
    {
        title:'Tạo bời',
        dataIndex:'createdBy',
        align:'center'
    },
    {
        title:'Cập nhật bời',
        dataIndex:'updatedBy',
        align:'center'
    },
    {
        title:'Trạng thái',
        dataIndex:'status',
        align:'center'
    },
    {
        title:'Hành động',
        dataIndex:'',
        align:'center',
        width:100,
        render(value, record, index) {

        const defaultClass=(color:string)=>`text-${color} bg-${color} border-${color} hover:text-${color}-100 hover:bg-${color}-100 hover:border-${color}-100 `
            return(
                <div className="flex items-center gap-1">
                    <ButtonComponent type="default" className={defaultClass('blue')}size="small" content={<><EyeFilled/></>}/>
                    <ButtonComponent type="primary" className={defaultClass('yellow')} size="small" content={<><EditOutlined/></>}/>
                    <ButtonComponent type="default" danger size="small" content={<><DeleteOutlined/></>}/>
                </div>
            )
        },
        
    },
]