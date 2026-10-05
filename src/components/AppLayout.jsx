import SiteHeader from './SiteHeader'
import MainNav from './MainNav'
import { Outlet } from 'react-router'
import { SelectedServiceProvider } from '../context/SelectedServiceContext'
import RequestsProvider from '../providers/RequestsProvider'
import { services } from '../data/services'

export default function AppLayout() {
  return (
    <>
      <SiteHeader />
      <MainNav />

      <main>
        <SelectedServiceProvider>
          <RequestsProvider services={services}>
            <Outlet />
          </RequestsProvider>
        </SelectedServiceProvider>
      </main>
    </>
  )
}