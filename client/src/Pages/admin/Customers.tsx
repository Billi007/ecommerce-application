import { ReactElement, useState, useCallback } from 'react'
import Sidebar from '../../components/Sidebar';
import { Column } from 'react-table';
import Table from '../../components/Table';
import img from '../../assets/pexels-photo-415829.jpeg'
import img1 from '../../assets/custo 1.jpeg'
import img2 from '../../assets/custo2.jpeg'
import img3 from '../../assets/custo3.jpeg'
import img4 from '../../assets/custo3.jpeg'
import img5 from '../../assets/custo5.jpeg'
import { FaTrash } from 'react-icons/fa6';

interface DataType {
  avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
 role: string;
 action: ReactElement
}

const columns:Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
]

const arr: DataType[] = [
  {
    avatar: <img 
    src={img} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Jane",
    gender: "Female",
    email: "jane@gmail.com",
    role: "User",
    action: <FaTrash />,
  },
  {
    avatar: <img 
    src={img1} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Nora",
    gender: "Female",
    email: "nora@gmail.com",
    role: "User",
    action:  <FaTrash />,
  },
  {
    avatar: <img 
    src={img2} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Max well",
    gender: "Male",
    email: "max@gmail.com",
    role: "User",
    action:  <FaTrash />,
  },
  {
    avatar: <img 
    src={img3} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Steve jackson",
    gender: "Male",
    email: "steve@gmail.com",
    role: "User",
    action:  <FaTrash />,
  },
  {
    avatar: <img 
    src={img4} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "paxton ",
    gender: "Male",
    email: "pax@gmail.com",
    role: "User",
    action:  <FaTrash />,
  },
  {
    avatar: <img 
    src={img5} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Gorge de",
    gender: "Male",
    email: "gorge@gmail.com",
    role: "User",
    action:  <FaTrash />,
  },
  {
    avatar: <img 
    src={img5} alt="avatar" style={{
      objectFit: "cover",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
    }} />,
    name: "Gorge de",
    gender: "Male",
    email: "gorge@gmail.com",
    role: "User",
    action:  <FaTrash />,
  }
]
function Customers() {
  const [data] = useState<DataType[]>(arr)
  const CustomerTable = useCallback(
    Table<DataType>(
      columns,
      data,
      "customer-box", 
      "Customer", true),
      []
  )
  return (
  <>
   <div className="admin-container">
    <Sidebar/>
    <main>{CustomerTable()}</main>
   </div>
  </>
  )
}

export default Customers