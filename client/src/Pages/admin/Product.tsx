import Sidebar from "../../components/Sidebar";
import { ReactElement, useState } from "react";
import Table from "../../components/Table";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import img from '../../assets/nikeshoe.jpeg'
import img2 from '../../assets/img3.jpg'
interface DataType {
  image: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Product Image",
    accessor: "image",
  },
  {
    Header: "Product Name",
    accessor: "name",
  },
  {
    Header: "Product Price",
    accessor: "price",
  },
  {
    Header: "Product Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr:DataType[] = [
  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  {
    image: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/products/sajknaskd">Manage</Link>,
  },

  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  
  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  {
    image: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/products/sajknaskd">Manage</Link>,
  },
  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  {
    image: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/products/sajknaskd">Manage</Link>,
  },

  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  {
    image: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/products/sajknaskd">Manage</Link>,
  },
  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
  {
    image: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/products/sajknaskd">Manage</Link>,
  },
  {
    image: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/products/sdaskdnkasjdn">Manage</Link>,
  },
]

function Products() {

  const [data] = useState<DataType[]>(arr)
  const ProductTable = Table<DataType>(columns,data, "dashboard-product-box", "Products", true);
  return (
    <>
   <div className="admin-container">
    <Sidebar/>
    <main>{ProductTable()}</main>
    <button className="create-product-btn"><Link className="white" to='/admin/products/new'>Create New</Link></button>
   </div>
  
  </>
  )
}

export default Products