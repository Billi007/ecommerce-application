import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader';
import Header from './components/Header';

const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const Products = lazy(() => import("./Pages/admin/Product"));
const Transactions = lazy(() => import("./Pages/admin/Transactions"));
const Customers = lazy(() => import("./Pages/admin/Customers"));
const NewProduct = lazy(() => import("./Pages/admin/Management/NewProduct"));
const ProductManagement = lazy(() => import("./Pages/admin/Management/ProductManagement"))
const TransactionManagement = lazy(() => import("./Pages/admin/Management/TransactionManagement"));
const BarChart = lazy(() => import("./Pages/admin/charts/BarChart"))
const PieChart = lazy(() => import("./Pages/admin/charts/PieChart"))
const LineChart = lazy(() => import("./Pages/admin/charts/LineChart"))
const Stopwatch = lazy(() => import("./Pages/admin/Apps/Stopwatch"))
const Coupon = lazy(() => import("./Pages/admin/Apps/Coupon"))
const Toss = lazy(() => import("./Pages/admin/Apps/Toss"))


const MainPage = lazy(() => import('./Pages/Main'))
const Home = lazy(() => import('./Pages/Home'));
const Search = lazy(() => import('./Pages/Search'));
const Cart = lazy(() => import('./Pages/Cart'));
const Shipping = lazy(() => import('./Pages/Shipping'));
const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrderDetails = lazy(() => import('./Pages/Order_details'));

function App() {


  return <Router>
     <Header/>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/' element={<MainPage/>}/>

      {/* Logged in use routes */}
      <Route>
      <Route path='/shipping' element={<Shipping/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/order/:id' element={<OrderDetails/>}/>
      </Route>

        {/* admin */}
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/products" element={<Products/>} />
        <Route path="/admin/transactions" element={<Transactions/>} />
        <Route path="/admin/customers" element={<Customers/>} />

        {/* charts */}
        <Route path="/admin/chart/bar" element={<BarChart/>} />
        <Route path="/admin/chart/pie" element={<PieChart/>} />
        <Route path="/admin/chart/line" element={<LineChart/>} />

        {/* apps */}
        <Route path="/admin/app/stopwatch" element={<Stopwatch/>} />
        <Route path="/admin/app/coupon" element={<Coupon/>} />
        <Route path="/admin/app/toss" element={<Toss/>} />

        {/* management */}
        <Route path="/admin/products/new" element={<NewProduct/>}/>
        <Route path="/admin/products/:id" element={<ProductManagement/>}/>
        <Route path="/admin/transactions/:id" element={<TransactionManagement/>}/>
    </Routes>
    </Suspense>
  </Router>
}

export default App
