import { IconType } from 'react-icons';
import { Link, useLocation, Location} from 'react-router-dom';
import { RiDashboardFill,RiCoupon3Fill, RiSecurePaymentFill, RiShoppingBagFill } from 'react-icons/ri';
import { BsFillPeopleFill } from 'react-icons/bs';
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";


function Sidebar() {
 const location = useLocation();

  return (
   <aside>
     <DivOne location={location}/>
     <Divtwo location={location} />
     <Divthree location={location}/>
    </aside>
  )
}
const DivOne = ({location}:{location: Location}) => (
  <div>
      <h5>Dashboard</h5>
      <ul>
      <Li 
        url="/admin/dashboard" 
        location={location}
        text="Dashboard" 
        Icon={RiDashboardFill}
        />

         <Li 
        url="/admin/products" 
        location={location}
        text="Product"  
        Icon={RiShoppingBagFill}
        />

         <Li 
        url="/admin/customers"  
        location={location}
        text="Customer"  
        Icon={BsFillPeopleFill}
        />

        <Li 
        url="/admin/transactions"  
        location={location}
        text="Transaction"  
        Icon={RiSecurePaymentFill}
        />
      </ul>
    </div>
)

const Divtwo = ({location}:{location: Location}) => (
<div>
      <h5>Charts</h5>
      <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
      />

      </ul>
    </div>
)

const Divthree = ({location}:{location: Location}) => (
  <div>
        <h5>Apps</h5>
        <ul>
        <Li
        url="/admin/app/stopwatch"
        text="Stopwatch"
        Icon={FaStopwatch}
        location={location}
      />
      <Li
        url="/admin/app/coupon"
        text="Coupon"
        Icon={RiCoupon3Fill}
        location={location}
      />
      <Li
        url="/admin/app/toss"
        text="Toss"
        Icon={FaGamepad}
        location={location}
      />
  
        </ul>
      </div>
  )

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}

const Li = ({url, location,text,Icon}:LiProps) => (
  <li
  style={{
    backgroundColor: location.pathname.includes(url) ? "rgb(207, 207, 207)" : "",
  }}>
    <Link
    to={url}
    style={{
      color: location.pathname.includes(url) ? "black" : "white",
    }}>
    <Icon/>
    {text} 
    </Link>
  </li>
)

export default Sidebar