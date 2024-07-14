import { ReactElement, useState } from 'react'
import Table from '../components/Table'
import { Column } from 'react-table'
import { Link } from 'react-router-dom'

type DataType = {
  _id : string,
  quantity: number,
  discount : number,
  amount : number,
  status : ReactElement,
  action : ReactElement
}

const column: Column<DataType>[] = [
  {
    Header: 'Order ID',
    accessor: '_id',
  },
  {
  Header: 'Quantity',
  accessor: 'quantity',
  },
  {
    Header: 'Discount',
    accessor: 'discount',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Status',
    accessor:'status',
  },
  {
    Header: 'Action',
    accessor: 'action',
  }, 
];
function Orders() {
  const [rows] = useState<DataType[]>(
    [
      {
        _id: 'ghxo8fp9wvcm',
        quantity: 3,
        discount: 4000,
        amount: 500000,
        status: <span className='red'>Processing</span>,
        action: <Link to={'/order/aggcbskh'}>View</Link>
      }
    ],
  );
  

  const orderTable = Table<DataType>(column, rows, "dashboard-product-box", "Orders", rows.length > 6)();
  
  return (
    <div className='order-container'>
      <h1>My Orders</h1>
      <div>{orderTable} </div>
    </div>
  )
}

export default Orders
