import { FieldValues, Path } from 'react-hook-form'
import FormWatchContainer, {
  WatchedValuesChangeHandler,
} from '../components/form-watch-container'
import { ReactElement } from 'react'

export const buildFormWatchContainer = <T extends FieldValues, TProps>(
  watchedValues: ReadonlyArray<Path<T>>,
  onWatchedValuesChange: WatchedValuesChangeHandler<T>,
  element: (props: TProps) => ReactElement,
) => {
  return (props: TProps) => {
    return (
      <FormWatchContainer
        watchedValues={watchedValues}
        onWatchedValuesChange={onWatchedValuesChange}
      >
        {element(props)}
      </FormWatchContainer>
    )
  }
}
