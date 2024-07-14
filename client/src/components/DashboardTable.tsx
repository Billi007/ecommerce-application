import Table from './Table'
import {Column} from 'react-table'


const columns:Column<DataType>[] = [
    {
            Header: "Id",
            accessor: "id",
        },
        {
            Header: "Quantity",
            accessor: "quantity",
        },
          {
            Header: "Discount",
            accessor: "discount",
        },
        {
            Header: "Amount",
            accessor: "amount",
        },
        {
            Header: "Status",
            accessor: "status",
          },
        ];
        
        interface DataType {
            id: string;
            quantity: number;
            discount: number;
            amount: number;
            status: string;
        }
        
function DashboardTable({data = []} : {data: DataType[]}) {
  return Table<DataType>(columns, data, "transaction-box", "Top Transaction")();
}

export default DashboardTable