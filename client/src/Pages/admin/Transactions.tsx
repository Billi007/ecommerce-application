import Sidebar from '../../components/Sidebar';
import { useState, useCallback } from 'react';
import { ReactElement } from 'react';
import Table from '../../components/Table';
import { Column } from 'react-table';
import { Link } from 'react-router-dom';

interface DataType {
  user: string;
  amount: number;
  disount: number;
  quantity: number;
 status: ReactElement;
 action: ReactElement
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "disount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr:DataType[] = [
  {
    user: 'John',
  amount: 5800,
  disount: 300,
  quantity: 3,
 status: <span className='red'>Processing</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
   {
    user: 'Nora',
  amount: 1200,
  disount: 100,
  quantity: 5,
 status: <span className='green'>Shipped</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
   {
    user: 'Maxi',
  amount: 25999,
  disount: 500,
  quantity: 4,
 status: <span className='purple'>Delivered</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
   {
    user: 'Lincon joe',
  amount: 18000,
  disount: 600,
  quantity: 8,
 status: <span className='red'>Processing</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
   {
    user: 'Mariyam',
  amount: 2399,
  disount: 200,
  quantity: 2,
 status: <span className='green'>Shipped</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
   {
    user: 'Jamie',
  amount: 28999,
  disount: 500,
  quantity: 7,
 status: <span className='purple'>Delivered</span>,
 action: <Link to="/admin/transactions/sdaskdnkasjdn">Manage</Link>
   },
]

function Transactions() {
  const [data] = useState<DataType[]>(arr)
  const TransactionTable = useCallback(Table<DataType>(
    columns,
    data, 
    "dashboard-transaction-box", 
    "Transactions"),[])
  return (
    <>
   <div className="admin-container">
    <Sidebar/>
    <main>
  {TransactionTable()}
    </main>
   </div>
  
  </>
  )
}

export default Transactions