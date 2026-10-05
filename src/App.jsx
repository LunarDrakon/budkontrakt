import { Routes, Route } from 'react-router'
import AppLayout from './components/AppLayout'
import RequestsLayout from './components/layout/RequestsLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailsPage from './pages/ServiceDetailsPage'
import RequestsPage from './pages/RequestsPage'
import RequestCreatePage from './pages/RequestCreatePage'
import RequestEditPage from './pages/RequestEditPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/services/:serviceId"
          element={<ServiceDetailsPage />}
        />

        <Route
          path="/requests"
          element={<RequestsLayout />}
        >
          <Route
            index
            element={<RequestsPage />}
          />

          <Route
            path="new"
            element={<RequestCreatePage />}
          />

          <Route
            path=":requestId/edit"
            element={<RequestEditPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  )
}