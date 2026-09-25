import SiteHeader from './SiteHeader'
import MainNav from './MainNav'

export default function AppLayout({ children }) {
    return (
        <>
            <SiteHeader />
            <MainNav />

            <main>
                {children}
            </main>
        </>
    )
}