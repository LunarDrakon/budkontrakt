import SiteHeader from './SiteHeader'
import MainNav from './MainNav'
import { Outlet } from 'react-router'
import { SelectedServiceProvider } from '../context/SelectedServiceContext'

export default function AppLayout() {
  return (
    <>
      <SiteHeader />
      <MainNav />

      <main>
        <SelectedServiceProvider>
          <Outlet />
        </SelectedServiceProvider>
      </main>
    </>
  )
}