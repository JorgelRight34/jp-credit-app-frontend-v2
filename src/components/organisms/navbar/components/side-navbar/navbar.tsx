import '../_navbar.css'
import {
  accessControlNavItem,
  accountStatusNavItem,
  armotizationsNavItem,
  collateralsNavItem,
  financesNavItem,
  followUpsNavItem,
  loansNavItem,
  notesNavItem,
  profileNavItem,
  projectsNavItem,
  transactionsNavItem,
} from '../../lib/navItems'
import NavbarFooter from './navbar-footer'
import { Link } from '@/components/atoms'
import { PropsWithUser } from '@/models/user'
import NavbarCard from './navbar-card'
import NavbarBody from './navbar-body'

const options = [
  profileNavItem,
  accountStatusNavItem,
  accessControlNavItem,
  loansNavItem,
  transactionsNavItem,
  financesNavItem,
  collateralsNavItem,
  projectsNavItem,
  followUpsNavItem,
  notesNavItem,
  armotizationsNavItem,
]

const Navbar = ({ user, header }: PropsWithUser<{ header: string }>) => (
  <div className="side-navbar rounded-bottom-lg bg-surface relative flex h-full w-full flex-col border-r shadow-sm">
    <div className="flex-shrink-0 p-2">
      <Link to="/">
        <NavbarCard
          className="text-primary"
          image={<img className="brand small-logo h-full w-full" alt="logo" />}
          text={header}
        />
      </Link>
    </div>
    <NavbarBody options={options} />
    <div className="hidden w-full flex-shrink-0 p-2 md:block">
      <NavbarFooter user={user} />
    </div>
  </div>
)

export default Navbar
