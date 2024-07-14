import Sidebar from "../../components/Sidebar";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg  from '../../assets/user.png'
import Data from '../../assets/Data.json'
import { BarChart, DoughnutChart } from "../../components/Chart";
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../../components/DashboardTable";

function Dashboard() {
  return (
    <div className="admin-container">
    <Sidebar/>
    <main className='dashboard'>

      {/* search-bar */}
      <div className="search-bar">
      <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
      </div>


        {/* widget-container */}
       <section className='widget-container'>
       <WidgetItem
       heading='Revenue'
       value={50000}
       amount={true}
       percent={40}
       color='orange'
       />

<WidgetItem
       heading='Users'
       value={400}
       amount={true}
       percent={-14}
       color='red'
       />

<WidgetItem
       heading='Transactions'
       value={23000}
       amount={false}
       percent={80}
       color='rgb(38, 95, 186)'
       />

<WidgetItem
       heading='Products'
       value={1000}
       amount={true}
       percent={30}
       color='green'
       />
       </section>

       <section className="graph-container">
        <div className="revenue-chart">
          <h2>REVENUE & TRANSACTIONS</h2>

           <BarChart
            data_1={[300, 144, 433, 655, 237, 755, 190,433, 655, 237,444, 343]}
            data_2={[200, 444, 343, 556, 778, 455, 990,541,897,362,259,145]}
            title_1="Revenue"
            title_2="Transaction"
            bgColor_1="rgb(0,115,255)"
            bgColor_2="rgba(53,162,235,0.8)"
          />
        </div>

        <div className="inventory">
        <h2>INVENTORY</h2>

          <div>
            {
              Data.categories.map((i) => (
                <CategoryItem
                key={i.value}
                heading={i.heading}
                value={i.value}
                color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))
            }
          </div>
        </div>
       </section>

       <section className="transaction-container">
        <div className="gender-chart">
          <h2>Gender ratio</h2>
          <DoughnutChart
          labels={["Female", "Male"]}
          data={[12,19]}
          cutout={90}
          bgColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
          />
          <p><BiMaleFemale/></p>
        </div>

       <DashboardTable data={Data.transaction}/>
       </section>

    </main>
   </div>
  )
}

interface WidgetItemProps {
  heading: string;
  value: number;
  amount:boolean
  percent: number;
  color: string;
}

const WidgetItem = ({heading,value,amount,percent,color} : WidgetItemProps) => 
<article className='widget'>
<div className="widgetInfo">
  <p>{heading}</p>
  <h4>{amount ? `$${value}` : value} </h4>
  {
    percent > 0 ?
    ( <span className="green"><HiTrendingUp/> +{percent}%{" "}</span>) : 
     (<span className="red"><HiTrendingDown/> {percent}%{" "}</span>)
  }
</div>
<div 
 style={{
  background: `conic-gradient(
  ${color} ${(Math.abs(percent) / 100) * 360}deg,
  rgb(255, 255, 255) 0
)`,
}}
className="widgetCircle">
  <span style={{color,}}>{percent}% </span>
</div>
</article>;


interface categoryItemProps {
heading: string;
color: string;
value: number;
}

const CategoryItem = ({heading,color,value} : categoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div style={{
        background:color,
        width: `${value}%`,
        }}></div>
    </div>
    <span>{value}%</span>
  </div>
)

export default Dashboard