import Sidebar from '../../../components/Sidebar';
import { BarChart } from '../../../components/Chart';

const months = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function BarCharts() {
  return (
    <div className='admin-container'>
      <Sidebar/>
      <main className='chart-container'>
        <h1>Bar Charts</h1>
        <section>
        <BarChart
        data_1={[300, 144, 433, 655, 237, 755, 190,433, 655, 237,444, 343]}
        data_2={[200, 444, 343, 556, 778, 455, 990,541,897,362,259,145]}
        title_1='Products'
        title_2='Users'
        bgColor_1="pink"
        bgColor_2="purple"
        />
         <h2>Top Selling Products & Top Customers</h2>
        </section>

        <section>
        <BarChart
        data_1={[300, 144, 433, 655, 237, 755, 144, 433, 190,433, 655, 237]}
        data_2={[]}
        title_1='Users'
        title_2=''
        bgColor_1="teal"
        bgColor_2=""
        horizontal={true}
        labels={months}
        />
         <h2>Top Selling Products & Top Customers</h2>
        </section>
      </main>
    </div>
  )
}


export default BarCharts