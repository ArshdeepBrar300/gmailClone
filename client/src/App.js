
import {  Navigate, RouterProvider, Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import {Provider} from 'react-redux'
import { routes } from './routes/routes';
import store from './store/store.js';
import AuthLayout from './components/AuthLayout'
import { Suspense, lazy } from 'react';
import SuspenseLoader from './components/SuspenseLoader';
const ErrorComponent=lazy(()=> import('./components/ErrorComponent'));


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path={routes.main.path} element={<routes.login.element/>}/> */}
      
        {/* <Route path={routes.main.path} element={
          <AuthLayout authentication={false}>
             <Navigate to={`/login`}/>
          </AuthLayout>}
        />
           */}
      <Route path={`${routes.main.path}/login`}  element={
         <AuthLayout authentication={false}>
            <routes.login.element/>
        </AuthLayout>
        }/>
      
   

        
       
      <Route path={routes.main.path} element={
        <AuthLayout authentication={true}>

          <routes.main.element/>
        </AuthLayout>
    
        }>
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element/>} errorElement={<ErrorComponent/>}/>
        <Route path={routes.view.path} element={<routes.view.element/>} errorElement={<ErrorComponent/>}/>
       </Route>
       <Route path={routes.invalid.path} element={
        <AuthLayout authentication={true}>
       <Navigate to={`${routes.emails.path}/inbox`}/></AuthLayout>}/>
    </Route>
  )

)
function App() {
  return (
    <Provider store={store}>
    <Suspense fallback={<SuspenseLoader/>}>
         <RouterProvider router={router}/>
    </Suspense>
    </Provider>
 
  );
}

export default App;
