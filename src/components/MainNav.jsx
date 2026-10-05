import { NavLink } from 'react-router'

export default function MainNav() {
  return (
    <nav>
      <NavLink
        to="/"
        end
      >
        Головна
      </NavLink>

      {' | '}

      <NavLink
        to="/services"
      >
        Наші послуги
      </NavLink>

      {' | '}

      <NavLink
        to="/requests"
      >
        Заявки
      </NavLink>
    </nav>
  )
}