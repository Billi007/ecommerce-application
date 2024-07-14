import Sidebar from '../../../components/Sidebar'
import { PieChart, DoughnutChart } from '../../../components/Chart'
import {categories} from '../../../assets/Data.json'

function PieCharts() {
  return (
    <div className='admin-container'>
      <Sidebar/>
      <main className='chart-container'>
        <h1>Pie & Doghnut Chart</h1>
        <section>
         <div>
         <PieChart
            labels={["Processing", "Shipped", "Delivered"]}
            data={[12, 9, 13]}
            bgColor={[
              `hsl(110,80%, 80%)`,
              `hsl(110,80%, 50%)`,
              `hsl(110,40%, 50%)`,
            ]}
            offset={[0, 0, 50]}
         />
         </div>
        <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
         <div>
         <DoughnutChart
           labels={categories.map(i => i.heading)}
           data={[40,20]}
              bgColor={categories.map(i => `hsl(${i.value*4}, ${i.value}%, 60%)`,)}
              offset={[0, 0, 0, 80]}
              legends= {false}
              cutout={"70%"}
         />
         </div>
        <h2>Product Categories Ratio</h2>
        </section>

        <section>
         <div>
         <DoughnutChart
            labels={["In Stock", "Out Of Stock"]}
           data={[40,20, 30, 10]}
              bgColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              offset={[10,30,0,50]}
              legends= {false}
              cutout= {"70%"}
         />
         </div>
         <h2>Stock Availability</h2>
        </section>

        <section>
         <div>
         <DoughnutChart
            labels={[
              "Marketing Cost",
              "Discount",
              "Burnt",
              "Production Cost",
              "Net Margin",
            ]}
            data={[32, 18, 5, 20, 25]}
              bgColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              offset={[20, 30, 20, 30, 80]}
              legends= {false}
             
         />
         </div>
         <h2>Revenue Distribution</h2>
        </section>

        <section>
         <div>
         <PieChart
            labels={[
              "Teenager(Below 20)",
              "Adult (20-40)",
              "Older (above 40)",
            ]}
            data={[30, 250, 70]}
            bgColor={[
              `hsl(10, ${80}%, 80%)`,
              `hsl(10, ${80}%, 50%)`,
              `hsl(10, ${40}%, 50%)`,
            ]}
              offset={[0,0, 80]}
         />
         </div>
        <h2>Users Age Group</h2>
        </section>

        <section>
         <div>
         <DoughnutChart
            labels={["Admin", "Customers"]}
            data={[40, 250]}
            bgColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[20, 30, 20, 30, 80]}
              legends= {false}
              cutout={"70%"}
         />
         </div>
         <h2>Revenue Distribution</h2>
        </section>
      </main>
    </div>
  )
}


export default PieCharts