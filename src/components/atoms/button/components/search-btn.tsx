import SecondaryBtn from './secondary-btn'
import type { SecondaryBtnProps } from './secondary-btn'

type SearchBtnProps = SecondaryBtnProps

/**
 * SearchBtn component renders a styled search button with a magnifying glass icon and "Buscar" label.
 *
 * This button can be reused across the application to trigger a search action.
 * It supports additional custom styling through the `className` prop.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} A styled search button with an icon.
 *
 * @example
 * <SearchBtn onClick={handleSearch} className="my-custom-class" />
 */
const SearchBtn = ({ ...props }: SearchBtnProps) => {
  return (
    <SecondaryBtn {...props} icon="search">
      Buscar
    </SecondaryBtn>
  )
}
export default SearchBtn
