import { EyeFilled } from "@/components/icons/common";
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
        render(value, record, index) {
            return(
                <div className="">
                    <ButtonComponent type="primary" className="text-red bg-green" size="small" icon={<EyeFilled/>}/>
                </div>
            )
        },
        
    },
]